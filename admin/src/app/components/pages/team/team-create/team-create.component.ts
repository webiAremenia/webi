import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  teamForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      amFullName: [''],
      ruFullName: [''],
      enFullName: ['', Validators.required],
      amPosition: [''],
      ruPosition: [''],
      enPosition: ['', Validators.required],
      amInfo: [''],
      ruInfo: [''],
      enInfo: ['', Validators.required],
      sort: ['10', Validators.required],
      img: ['', Validators.required],
    });
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.teamForm.get('img').setValue(file);
    }
  }


  myPage() {
    const fd: any = new FormData();
    const fullName: {} = {
      am: this.teamForm.get('amFullName').value,
      ru: this.teamForm.get('ruFullName').value,
      en: this.teamForm.get('enFullName').value
    };
    const position: {} = {
      am: this.teamForm.get('amPosition').value,
      ru: this.teamForm.get('ruPosition').value,
      en: this.teamForm.get('enPosition').value
    };
    const info: {} = {
      am: this.teamForm.get('amInfo').value,
      ru: this.teamForm.get('ruInfo').value,
      en: this.teamForm.get('enInfo').value
    };
    fd.append('img', this.teamForm.get('img').value);
    fd.append('fullName', JSON.stringify(fullName));
    fd.append('position', JSON.stringify(position));
    fd.append('sort', this.teamForm.get('sort').value);
    fd.append('info', JSON.stringify(info));


    this.dataService.sendData(fd, 'team').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/team']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }
}
