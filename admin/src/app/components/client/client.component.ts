import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../_services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients;
  done = false;

  constructor(private  service: ClientService) {
  }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.service.getClients().subscribe(
      data => {
        this.clients = data;
        this.done = true;
      },
      err => console.log(err)
    );
  }
}
