import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecomerce',
  templateUrl: './ecomerce.component.html',
  styleUrls: ['./ecomerce.component.scss']
})
export class EcomerceComponent implements OnInit {

  url = 'assets/images/test/undraw_businessman_97x4.svg';
  url1 = '../assets/images/test/Breakfast.svg';
  url2 = 'assets/images/test/people.jpg';
  constructor() { }

  ngOnInit() {
  }

}
