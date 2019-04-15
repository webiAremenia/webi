import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../_services/menu.service';
import {Menu} from '../../_models/menu';


@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
    menuList: Menu[];
    done = false;


    constructor(private menuService: MenuService) {

    }

    ngOnInit() {
        this.getMenuList();
    }

    getMenuList() {
        this.menuService.getAll().subscribe(
            data => {
                this.menuList = data;
                this.done = true;
                console.log(data);
            },
            err => console.log(err)
        )
    }

}
