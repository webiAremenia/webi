import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Language} from '../../../../_models/Language';

@Component({
  selector: 'app-language-edit',
  templateUrl: './language-edit.component.html',
  styleUrls: ['./language-edit.component.css']
})
export class LanguageEditComponent implements OnInit {

  languageForm: FormGroup;
  language: Language;
  done: boolean;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.language) {
      this.router.navigate(['admin/language']);
    }
  }

  ngOnInit() {

    this.language = this.itemService.language;
    this.done = true;

    this.languageForm = this.formBuilder.group({
      status: [this.language['status'], Validators.required]
    });
  }


  myLanguage() {
    const form = {
      status: this.languageForm.controls.status.value,
    };
    this.dataService.updateData(form, 'language', this.language._id).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/language']);
      }
    }, (err) => {
      console.log(err);
    });
  }


}
