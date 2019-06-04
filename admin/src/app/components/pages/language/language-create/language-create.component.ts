import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-language-create',
  templateUrl: './language-create.component.html',
  styleUrls: ['./language-create.component.css']
})
export class LanguageCreateComponent implements OnInit {

  languageForm: FormGroup;
  language: String = 'en';
  res: String = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.languageForm = this.formBuilder.group({
      value: ['', Validators.required],
      slug: ['', Validators.required],
      status: ['', Validators.required],
    });

  }


  mySetting() {
    const form = {
      value: this.languageForm.get('value').value,
      slug: this.languageForm.get('slug').value,
      status: this.languageForm.get('status').value,
    };

    this.dataService.sendData(form, 'language').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/language']);
      } else {
        this.res = data['msg'];
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }

}
