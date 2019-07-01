import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards-type-one',
  templateUrl: './cards-type-one.component.html',
  styleUrls: ['./cards-type-one.component.scss']
})
export class CardsTypeOneComponent implements OnInit {

  @Input() cardsHeading: string;

  constructor() { }

  ngOnInit() {
  }

}
