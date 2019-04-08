import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {element} from 'protractor';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-portfolio-create',
  templateUrl: './portfolio-create.component.html',
  styleUrls: ['./portfolio-create.component.css']
})
export class PortfolioCreateComponent implements OnInit {
  porfolioForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.porfolioForm = this.formBuilder.group({
      url: ['', Validators.required],
      amTitle: [''],
      ruTitle: [''],
      enTitle: ['', Validators.required],
      amDescription: [''],
      ruDescription: [''],
      enDescription: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.porfolioForm.get('img').setValue(file);
    }
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
    fd.append('url', this.porfolioForm.get('url').value);
    fd.append('img', this.porfolioForm.get('img').value);
    fd.append('title', JSON.stringify(title));
    fd.append('description', JSON.stringify(description));


    this.dataService.sendData(fd, 'portfolio').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/portfolio']);
      }
    },(err)=>{
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }

}
