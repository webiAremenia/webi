import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../../../_services/data.service";
import {ItemService} from "../../../../_services/item.service";
import {Menu} from "../../../../../../../front/src/app/components/_models/menu";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus : Menu[];
  delete: any;
  done : boolean = false;
  button : boolean = false;

  constructor(private router : Router, private dataService: DataService, private itemService : ItemService) {
  }

  ngOnInit() {

    this.dataService.getData('menu').subscribe(data => {
      this.menus = data['menus'];
      if(this.menus.length !== 0){
        this.button = true;
      }
    }, (err)=>{
      console.log(err);
    });

  }

  deleteMenu(menu,i) {
    this.button = false;
    this.delete = confirm('Are you want to delete?');
    if (this.delete == true) {
      this.dataService.delete('menu', menu._id).subscribe(data => {
        if (data['success']) {
          this.menus.splice(i, 1);
          if(this.menus.length !== 0){
            this.button = true;
          }
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  updateMenu(menu) {
    this.itemService.menu = menu;
    this.itemService.menus = this.menus;
    this.router.navigate(['admin/menu/edit']);
  }

  viewMenu(menu) {
    this.itemService.menu = menu;
    this.itemService.menus = this.menus;

  }

  myCreate(){
    this.itemService.menus = this.menus;
    this.router.navigate(['admin/menu/create']);
  }
  mySort(){
    this.router.navigate(['admin/menu/sort']);
  }

}
