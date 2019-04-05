import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {Portfolio} from '../../../../_models/Portfolio';
import {Media} from '../../../../_models/Media';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  styleUrls: ['./media-view.component.css']
})
export class MediaViewComponent implements OnInit {
  media: Media;
  language: String = 'en';
  done: boolean;
  delete: any;
  categories: any = ['slider', 'media'];
  optionVal: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.media) {
      this.router.navigate(['admin/media']);
    }
  }

  ngOnInit() {

    this.media = this.itemService.media;
    this.done = true;
    this.optionVal = this.categories[+this.media.category];
  }

  updateMedia(media) {
    this.itemService.media = media;
    this.router.navigate(['admin/media/edit']);
  }

  deleteMedia(media, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('media', media._id).subscribe(data => {
        if (data['success']) {
          this.router.navigate(['admin/media']);
        } else {
          console.log('DAta ', data);
        }
      },(err)=>{
        console.log(err);
      });
    }
  }

  ok() {
    this.router.navigate(['admin/media']);
  }

}
