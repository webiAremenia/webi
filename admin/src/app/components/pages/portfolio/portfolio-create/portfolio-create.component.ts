import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

@Component({
  selector: 'app-portfolio-create',
  templateUrl: './portfolio-create.component.html',
  styleUrls: ['./portfolio-create.component.css']
})
export class PortfolioCreateComponent implements OnInit {
  portfolioForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;


  config = {
    plugins: [CKFinder],

    // Enable the CKFinder button in the toolbar.
    toolbar: ['ckfinder'],

    ckfinder: {
      // Upload the images to the server using the CKFinder QuickUpload command.
      uploadUrl: 'http://localhost:3000/images',

      // Define the CKFinder configuration (if necessary).
      options: {
        resourceType: 'Images'
      }
    }
  };

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.portfolioForm = this.formBuilder.group({
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
      this.portfolioForm.get('img').setValue(file);
    }
  }


  myPortfolio() {
    const fd: any = new FormData();
    const title: {} = {
      am: this.portfolioForm.get('amTitle').value,
      ru: this.portfolioForm.get('ruTitle').value,
      en: this.portfolioForm.get('enTitle').value
    };
    const description: {} = {
      am: this.portfolioForm.get('amDescription').value,
      ru: this.portfolioForm.get('ruDescription').value,
      en: this.portfolioForm.get('enDescription').value
    };
    fd.append('url', this.portfolioForm.get('url').value);
    fd.append('img', this.portfolioForm.get('img').value);
    fd.append('title', JSON.stringify(title));
    fd.append('description', JSON.stringify(description));


    this.dataService.sendData(fd, 'portfolio').subscribe(data => {
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

}
