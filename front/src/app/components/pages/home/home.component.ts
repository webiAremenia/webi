import {Component, OnInit} from '@angular/core';
import {MediaService} from '../../_services/media.service';
import {Menu} from '../../_models/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private media: MediaService) {
  }

  done = false;

  ngOnInit() {
    this.media.getMedia().subscribe(
      data => {
        // console.log(data);
        this.done = true;
      }
      ,
      err => console.log(err)
    );

  }

}
