import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {

    constructor(private service: DataService) {
    }

    dropMenu = true;

    ngOnInit() {
        this.service.getInvoice().subscribe(
            d => console.log(d),
            e => console.log(e)
        );
    }

    addMenu() {
        this.dropMenu = !this.dropMenu;
    }

}
