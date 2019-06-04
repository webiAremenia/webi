import { Component, OnInit } from '@angular/core';
import {Page} from '../../../../_models/Page';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  news: Page;
  newsForm: FormGroup;
  language: String = 'en';
  done: boolean;
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.news) {
      this.router.navigate(['admin/news']);
    }
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
