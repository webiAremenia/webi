import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Team} from '../../../../_models/Team';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  team : Team;
  teamForm: FormGroup;
  language: String = 'en';
  done: boolean;
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.team) {
      this.router.navigate(['admin/team']);
    }
  }

  ngOnInit() {
    this.team = this.itemService.team;
    this.done = true;
    this.teamForm = this.formBuilder.group({
      amFullName: [this.team['fullName'].am],
      ruFullName: [this.team['fullName'].ru],
      enFullName: [this.team['fullName'].en, Validators.required],
      amPosition: [this.team['position'].am],
      ruPosition: [this.team['position'].ru],
      enPosition: [this.team['position'].en, Validators.required],
      amInfo: [this.team['info'].am],
      ruInfo: [this.team['info'].ru],
      enInfo: [this.team['info'].en, Validators.required],
      sort: [this.team['sort'], Validators.required],
      img: [this.team['banner']],
    });

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
    fd.append('info', JSON.stringify(info));
    fd.append('sort', this.teamForm.get('sort').value);


    this.dataService.updateData(fd, 'team', this.team._id).subscribe(data => {
      this.router.navigate(['admin/team']);
    },(err)=>{
      console.log(err);
    });

  }


  changeLanguage(language) {
    this.language = language;
  }


  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.teamForm.get('img').setValue(file);
    }
  }

}
