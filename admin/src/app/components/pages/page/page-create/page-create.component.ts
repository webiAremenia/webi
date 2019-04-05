import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.css']
})
export class PageCreateComponent implements OnInit {
  pageForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
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


    this.dataService.sendData(fd, 'page').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/page']);
      }
    },(err)=>{
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }
}
