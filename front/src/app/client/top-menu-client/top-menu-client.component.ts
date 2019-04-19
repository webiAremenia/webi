import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-top-menu-client',
    templateUrl: './top-menu-client.component.html',
    styleUrls: ['./top-menu-client.component.css']
})
export class TopMenuClientComponent implements OnInit {
    dropMenu = true;

    constructor() {
    }

    ngOnInit() {
    }

    addMenu() {
        this.dropMenu = !this.dropMenu;
    }
}
