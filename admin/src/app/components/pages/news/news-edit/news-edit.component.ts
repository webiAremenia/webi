import {Component, OnInit} from '@angular/core';
import {Page} from '../../../../_models/Page';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {News} from "../../../../_models/News";
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
    this.url = url + 'uploads/news/ckeditor/' + this.dir + '/';
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
        this.service.ckEditorSaveImage(form, 'news').subscribe(d => {
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
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  news: News;
  newsForm: FormGroup;
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
    if (!this.itemService.news) {
      this.router.navigate(['admin/news']);
    }
    this.url = this.globals.queryUrl;
    this.initEditor();
  }

  ngOnInit() {
    this.news = this.itemService.news;
    this.done = true;
    this.newsForm = this.formBuilder.group({
      amTitle: [this.news['title'].am],
      ruTitle: [this.news['title'].ru],
      enTitle: [this.news['title'].en, Validators.required],
      amDescription: [this.news['description'].am],
      ruDescription: [this.news['description'].ru],
      enDescription: [this.news['description'].en, Validators.required],
      amContent: [this.news['content'].am],
      ruContent: [this.news['content'].ru],
      enContent: [this.news['content'].en, Validators.required],
      img: [this.news['banner']],
    });
    this.randomString = this.news.random;
    this.dirName = this.news.random;


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

  myNews() {
    const fd: any = new FormData();
    const title: {} = {
      am: this.newsForm.get('amTitle').value,
      ru: this.newsForm.get('ruTitle').value,
      en: this.newsForm.get('enTitle').value
    };
    const description: {} = {
      am: this.newsForm.get('amDescription').value,
      ru: this.newsForm.get('ruDescription').value,
      en: this.newsForm.get('enDescription').value
    };
    const content: {} = {
      am: this.newsForm.get('amContent').value,
      ru: this.newsForm.get('ruContent').value,
      en: this.newsForm.get('enContent').value
    };
    fd.append('img', this.newsForm.get('img').value);
    fd.append('title', JSON.stringify(title));
    fd.append('description', JSON.stringify(description));
    fd.append('content', JSON.stringify(content));


    this.dataService.updateData(fd, 'news', this.news._id).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/news']);
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
      this.newsForm.get('img').setValue(file);
    }
  }

}
