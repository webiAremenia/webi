import {Component, OnInit} from '@angular/core';
import {Menu} from '../../../../../../../front/src/app/components/_models/menu';
import {Router} from '@angular/router';
import {DataService} from '../../../../_services/data.service';
import {Tree} from '../../../../_models/Tree';

@Component({
  selector: 'app-menu-sort',
  templateUrl: './menu-sort.component.html',
  styleUrls: ['./menu-sort.component.css']
})
export class MenuSortComponent implements OnInit {

  menus: Menu[];
  done = false;
  myTree: Tree[];

  constructor(private router: Router, private dataService: DataService) {

  }

  ngOnInit() {

    const parentArr = [];
    const childArr = [];

    const makeTree = (arr, p) => {
      for (let j = 0; j < arr.length; ++j) {
        if (p._id == arr[j].parentId) {
          p.childrens.push(arr[j]);
          arr[j].parent = p;
          p = arr[j];
          arr.splice(j, 1);
          return makeTree(arr, p);
        }
      }
      if (!p.parent) {
        return null;
      } else {
        p = p.parent;
        return makeTree(arr, p);
      }
    };
    this.dataService.getData('menu').subscribe(data => {
      let k = 0;
      data['menus'].forEach(menu => {
        if (!menu.parent) {
          const obj: Tree = {
              name: menu.title.en,
              id: k++,
              _id: menu._id,
              parentId: null,
              parent: null,
              childrens: [],
              options: {
                showActionButtons: false
              }
            }
          ;
          parentArr.push(obj);
        } else {
          const obj2: Tree = {
            name: menu.title.en,
            id: k++,
            _id: menu._id,
            parentId: menu.parent,
            childrens: [],
            options: {
              showActionButtons: false
            }
          };
          childArr.push(obj2);
        }

      });
      for (let i = 0; i < parentArr.length; ++i) {
        makeTree(childArr, parentArr[i]);
      }
      this.myTree = parentArr;
      this.done = true;
    }, (err) => {
      console.log(err);
    });
  }

  mySave() {

    // IF ELEMENT HAVE NOT PARENT PUSH PARENTNULL array
    const parentNull = [];
    // FINALY ARR LASTARR array
    const lastArr = [];
    // AFTER FILTERING LASTARR BY ID AND PARENT ALL DATA[] == LASTARR
    const data = [];

    const makeOneArrWithAllElements = (arr) => {
      for (let i = 0; i < arr.length; ++i) {
        lastArr.push(arr[i]);
        if (arr[i].childrens.length !== 0) {
          makeOneArrWithAllElements(arr[i].childrens);
        }
      }
    };

    const editParentsAndChilds = (arr, parent) => {
      for (let i = 0; i < arr.length; ++i) {
        arr[i].parentId = parent._id;
        if (arr[i].childrens !== 0) {
          editParentsAndChilds(arr[i].childrens, arr[i]);
        }
      }
      return arr;
    };

    this.myTree.forEach(item => {
      item.parentId = null;
      item.parent = null;
      parentNull.push(item);
    });

    for (let i = 0; i < parentNull.length; ++i) {
      if (parentNull[i].childrens.length !== 0) {
        editParentsAndChilds(parentNull[i].childrens, parentNull[i]);
      }
    }

    makeOneArrWithAllElements(parentNull);
    lastArr.forEach(item => {
      const obj = {
        id: item._id,
        parent: item.parentId,
      };
      data.push(obj);
    });
    const form = {
      data: data
    };
    this.dataService.menuUpdate(form, 'menu').subscribe(data => {
      if (data['success']) {
        this.router.navigate(['admin/menu']);
      }
      // if()
    }, (err) => {
      console.log(err);
    });
  }

}
