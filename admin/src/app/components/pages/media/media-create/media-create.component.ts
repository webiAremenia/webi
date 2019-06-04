import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-media-create',
  templateUrl: './media-create.component.html',
  styleUrls: ['./media-create.component.css']
})
export class MediaCreateComponent implements OnInit {
  mediaForm: FormGroup;
  language: String = 'en';
  public Editor = ClassicEditor;
  options: any;
  categories: any = ['slider', 'media'];

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.mediaForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      amAlt: [''],
      ruAlt: [''],
      enAlt: [''],
      img: ['', Validators.required],
    });

  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.mediaForm.get('img').setValue(file);
    }
  }


  myMedia() {
    const fd: any = new FormData();
    const alt: {} = {
      am: this.mediaForm.get('amAlt').value,
      ru: this.mediaForm.get('ruAlt').value,
      en: this.mediaForm.get('enAlt').value
    };
    fd.append('img', this.mediaForm.get('img').value);
    fd.append('category', this.mediaForm.get('category').value);
    fd.append('alt', JSON.stringify(alt));


    this.dataService.sendData(fd, 'media').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/media']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }


}
