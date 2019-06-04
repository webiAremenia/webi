import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  newsForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.newsForm = this.formBuilder.group({
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
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newsForm.get('img').setValue(file);
    }
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


    this.dataService.sendData(fd, 'news').subscribe(data => {
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
}
