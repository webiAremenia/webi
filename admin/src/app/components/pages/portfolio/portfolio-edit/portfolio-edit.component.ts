import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Portfolio} from '../../../../_models/Portfolio';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ItemService} from '../../../../_services/item.service';
import {Globals} from '../../../../app.globals';
import {CkeditorService} from '../../../../_services/ckeditor.service';


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
    this.url = url + 'uploads/portfolio/ckeditor/' + this.dir + '/';
  }

  upload() {
    return new Promise((resolve, reject) => {
      // console.log('UploadAdapter upload called', this.loader, this.url);
      console.log('uploading');
      this.loader.file.then(f => {
        const form = new FormData();
        form.append('random', this.random);
        form.append('dirName', this.dir);
        form.append('image', f);
        this.imageName = this.random + f.name;

        // console.log('random ', this.random);
        // console.log('dirName ', this.dir);
        // console.log('image ', f);
        this.service.ckEditorSaveImage(form, 'portfolio').subscribe(d => {
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
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {
  porfolioForm: FormGroup;
  portfolio: Portfolio;
  language: String = 'en';
  done: boolean;
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
    private itemService: ItemService,
    private globals: Globals,
    private ckService: CkeditorService
  ) {
    if (!this.itemService.portfolio) {
      this.router.navigate(['admin/portfolio']);
    }
    this.url = this.globals.queryUrl;
    this.initEditor();
  }

  ngOnInit() {
    this.portfolio = this.itemService.portfolio;
    this.done = true;
    console.log(this.portfolio);
    this.porfolioForm = this.formBuilder.group({
      url: [this.portfolio.url, Validators.required],
      amTitle: [this.portfolio['title'].am],
      ruTitle: [this.portfolio['title'].ru],
      enTitle: [this.portfolio['title'].en, Validators.required],
      amDescription: [this.portfolio['description'].am],
      ruDescription: [this.portfolio['description'].ru],
      enDescription: [this.portfolio['description'].en],
      amShortDescription: [this.portfolio['shortDescription'].am],
      ruShortDescription: [this.portfolio['shortDescription'].ru],
      enShortDescription: [this.portfolio['shortDescription'].en, Validators.required],
      amHover: [this.portfolio['hover'].am],
      ruHover: [this.portfolio['hover'].ru],
      enHover: [this.portfolio['hover'].en, Validators.required],
      img: [this.portfolio['image']],
    });

    this.randomString = this.portfolio.random;
    this.dirName = this.portfolio.random;

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

  myPortfolio() {
    const fd: any = new FormData();
    const title: {} = {
      am: this.porfolioForm.get('amTitle').value,
      ru: this.porfolioForm.get('ruTitle').value,
      en: this.porfolioForm.get('enTitle').value
    };
    const description: {} = {
      am: this.porfolioForm.get('amDescription').value,
      ru: this.porfolioForm.get('ruDescription').value,
      en: this.porfolioForm.get('enDescription').value
    };
    const hover: {} = {
      am: this.porfolioForm.get('amHover').value,
      ru: this.porfolioForm.get('ruHover').value,
      en: this.porfolioForm.get('enHover').value
    };
    const shortDescription: {} = {
      am: this.porfolioForm.get('amShortDescription').value,
      ru: this.porfolioForm.get('ruShortDescription').value,
      en: this.porfolioForm.get('enShortDescription').value
    };
    fd.append('url', this.porfolioForm.get('url').value);
    fd.append('img', this.porfolioForm.get('img').value);
    fd.append('title', JSON.stringify(title));
    fd.append('description', JSON.stringify(description));
    fd.append('shortDescription', JSON.stringify(shortDescription));
    fd.append('hover', JSON.stringify(hover));

    // console.log(hover)
    // console.log(JSON.parse(JSON.stringify(hover)));

    this.dataService.updateData(fd, 'portfolio', this.portfolio._id).subscribe(data => {

      if (data['success']) {
        this.router.navigate(['admin/portfolio']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.porfolioForm.get('img').setValue(file);
    }
  }

}
