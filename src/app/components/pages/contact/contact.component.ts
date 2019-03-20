import {Component, OnInit} from '@angular/core';
import {TestService} from '../../_services/test.service';
import {Test} from '../../models/tets';
import {ContactService} from '../../_services/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  questions: Test[];

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    // this.contactService.getData().subscribe(
    //   (data: Test[]) => {
    //     this.questions = data;
    //     // console.log(this.questions);
    //   },
    //   err => console.log(err)
    // );
  }
}
