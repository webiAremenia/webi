import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Page} from '../../../../_models/Page';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  page: Page;
  pageForm: FormGroup;
  language: String = 'en';
  done: boolean;
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.page) {
      this.router.navigate(['admin/page']);
    }
  }

  ngOnInit() {
    this.page = this.itemService.page;
    this.done = true;
    this.pageForm = this.formBuilder.group({
      amTitle: [this.page['title'].am],
      ruTitle: [this.page['title'].ru],
      enTitle: [this.page['title'].en, Validators.required],
      amDescription: [this.page['description'].am],
      ruDescription: [this.page['description'].ru],
      enDescription: [this.page['description'].en, Validators.required],
      amContent: [this.page['content'].am],
      ruContent: [this.page['content'].ru],
      enContent: [this.page['content'].en, Validators.required],
      img: [this.page['banner']],
    });

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


    this.dataService.updateData(fd, 'page', this.page._id).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/page']);
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
      let file = event.target.files[0];
      this.pageForm.get('img').setValue(file);
    }
  }

}
