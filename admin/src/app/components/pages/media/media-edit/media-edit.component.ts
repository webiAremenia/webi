import {Component, OnInit} from '@angular/core';
import {Media} from '../../../../_models/Media';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.css']
})
export class MediaEditComponent implements OnInit {
  mediaForm: FormGroup;
  media: Media;
  language: String = 'en';
  done: boolean;
  public Editor = ClassicEditor;
  categories: any = ['ecomerce-slider', 'media'];
  optionVal: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.media) {
      this.router.navigate(['admin/media']);
    }
  }

  ngOnInit() {

    this.media = this.itemService.media;
    this.done = true;

    this.mediaForm = this.formBuilder.group({
      category: [this.media['category']],
      amAlt: [this.media['alt'].am],
      ruAlt: [this.media['alt'].ru],
      enAlt: [this.media['alt'].en, Validators.required],
      img: [this.media['img']]
    });
  }

  changeLanguage(language) {
    this.language = language;
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


    this.dataService.updateData(fd, 'media', this.media._id).subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/media']);
      }
    }, (err) => {
      console.log(err);
    });
  }


  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.mediaForm.get('img').setValue(file);
    }
  }

}
