import {Component, OnInit} from '@angular/core';
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

  constructor(private router: Router, private dataService: DataService, private itemService: ItemService) {
  }

  ngOnInit() {


    this.dataService.getData('media').subscribe(data => {
      this.medias = data['medias'];

    }, (err) => {
      console.log(err);
    });

  }

  deleteMedia(media, i) {
    this.delete = confirm('Are you want to delete?');
    if (this.delete === true) {
      this.dataService.delete('media', media._id).subscribe(data => {
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
