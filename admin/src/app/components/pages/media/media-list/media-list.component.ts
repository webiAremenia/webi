import { Component, OnInit } from '@angular/core';
import {Portfolio} from '../../../../_models/Portfolio';
import {Media} from '../../../../_models/Media';
import {Router} from '@angular/router';
import {DataService} from '../../../../_services/data.service';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-media',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  medias: Media[];
  delete: any;
  searchTerm: String;
  options;
  constructor(private router : Router, private dataService: DataService, private itemService : ItemService) {
  }

  ngOnInit() {


    this.dataService.getData('media').subscribe(data => {
      // console.log('Data ', data);
      this.medias = data['medias'];
      console.log('ALt ', this.medias[0]);
    });

    this.options = {
      onUpdate: (event: any) => {
        console.log(this.medias)
      }
    };
  }

  deleteMedia(media,i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('media', media._id).subscribe(data => {
        console.log('Data ', data);

        if (data['success']) {
          this.medias.splice(i, 1);
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  updateMedia(media) {
    this.itemService.media = media;
    this.router.navigate(['admin/media/edit']);
  }

  viewMedia(media) {
    this.itemService.media = media;
  }

}
