import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Globals} from "../../../../app.globals";
import {CkeditorService} from "../../../../_services/ckeditor.service";

class UploadAdapter {
  loader;  // your adapter communicates to CKEditor through this
  url;
  service;
  imageName;
  dir;
  random;

  constructor(loader, service, dir, random, url) {
    this.random = random;
    this.dir = dir;
    this.service = service;
    this.loader = loader;
    this.url = url + 'uploads/page/ckeditor/' + this.dir + '/';
  }

  upload() {
    return new Promise((resolve, reject) => {
      // console.log('UploadAdapter upload called', this.loader, this.url);
      console.log('uploading')
      this.loader.file.then(f => {
        const form = new FormData();
        form.append('random', this.random);
        form.append('dirName', this.dir);
        form.append('image', f);
        this.imageName = this.random + f.name;

        // console.log('random ', this.random);
        // console.log('dirName ', this.dir);
        // console.log('image ', f);
        this.service.ckEditorSaveImage(form, 'page').subscribe(d => {
            resolve({default: this.url + this.random + f.name});
          },
          e => console.log(e)
        );
      });
    });
  }

  // Aborts the upload process.
  abort() {
    console.log('Abort');
    this.service.ckEditorDeletePortfolioImage(this.dir + '/' + this.imageName).subscribe(d => {
        console.log('22222');
        console.log(d);
      },
      e => console.log(e)
    );
  }

}


@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit, OnDestroy {
  pageForm: FormGroup;
  language: String = 'en';
  public ckconfig: any;
  public Editor = ClassicEditor;
  randomString;
  dirName;
  url;
  saved = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private globals: Globals,
    private ckService: CkeditorService
  ) {
    this.url = this.globals.queryUrl
    this.initEditor();
  }

  ngOnInit() {
    this.pageForm = this.formBuilder.group({
      amTitle: [''],
      ruTitle: [''],
      enTitle: ['', Validators.required],
      amDescription: [''],
      ruDescription: [''],
      enDescription: ['', Validators.required],
      amContent: [''],
      ruContent: [''],
      enContent: ['', Validators.required],
      img: ['', Validators.required],
    });
    this.randomString = this.generateRandomString(10);
    this.dirName = this.randomString;

  }

  theUploadAdapterPlugin = (editor) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(loader, this.ckService, this.dirName, this.randomString += 's', this.url);
    };
  }

  public initEditor() {
    this.ckconfig = {
      extraPlugins: [this.theUploadAdapterPlugin]
    };
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.pageForm.get('img').setValue(file);
    }
  }


  myPage() {
    const fd: any = new FormData();
    const title: {} = {
      am: this.pageForm.get('amTitle').value,
      ru: this.pageForm.get('ruTitle').value,
      en: this.pageForm.get('enTitle').value
    };
    const description: {} = {
      am: this.pageForm.get('amDescription').value,
      ru: this.pageForm.get('ruDescription').value,
      en: this.pageForm.get('enDescription').value
    };
    const content: {} = {
      am: this.pageForm.get('amContent').value,
      ru: this.pageForm.get('ruContent').value,
      en: this.pageForm.get('enContent').value
    };
    fd.append('img', this.pageForm.get('img').value);
    fd.append('title', JSON.stringify(title));
    fd.append('description', JSON.stringify(description));
    fd.append('content', JSON.stringify(content));
    fd.append('random', this.dirName);


    this.dataService.sendData(fd, 'page').subscribe(data => {
      if (data['success']) {
        this.saved = true;
        this.router.navigate(['admin/page']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }

  generateRandomString(stringLength) {
    let randomString = '';
    let randomAscii;
    for (let i = 0; i < stringLength; i++) {
      randomAscii = Math.floor((Math.random() * 25) + 97);
      randomString += String.fromCharCode(randomAscii);
    }
    return randomString;
  }

  ngOnDestroy() {
    if (!this.saved) {
      this.ckService.ckDeleteDir(this.dirName, 'page').subscribe();
    }
  }
}
