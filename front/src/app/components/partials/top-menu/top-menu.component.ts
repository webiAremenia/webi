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
    hed;
    parent;

    constructor(private menuService: MenuService) {

    }

    ngOnInit() {
        this.hed = document.getElementById('headerScroll');
        this.parent = document.getElementById('parentDiv');
        this.getMenuList();
        this.changeMenuHeight();
    }

    getMenuList() {
        this.menuService.getAll().subscribe(
            data => {
                this.menuList = data;
                this.done = true;
            },
            err => console.log(err)
        );
    }

    changeMenuHeight() {
        this.parent.onscroll = e => {
            const scrollTop = e.target.scrollTop;
            if (scrollTop > 50) {
                this.hed.classList.add('scroll-change-height');
            } else {
                this.hed.classList.remove('scroll-change-height');
            }
        };
    }

}
