import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSection = 'section1';
  constructor() {
  }

  ngOnInit() {

  }
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
    console.log(this.currentSection);
  }

}
