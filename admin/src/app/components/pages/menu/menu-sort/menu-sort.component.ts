import {Component, OnInit} from '@angular/core';
import {Menu} from "../../../../../../../front/src/app/components/_models/menu";
import {Router} from "@angular/router";
import {DataService} from "../../../../_services/data.service";
import {Tree} from "../../../../_models/Tree";

@Component({
  selector: 'app-menu-sort',
  templateUrl: './menu-sort.component.html',
  styleUrls: ['./menu-sort.component.css']
})
export class MenuSortComponent implements OnInit {

  menus: Menu[];
  done: boolean = false;
  myTree: Tree[];

  // exTree;

  constructor(private router: Router, private dataService: DataService) {

  }

  ngOnInit() {

    let parentArr = [];
    let childArr = [];

    let makeTree = (arr, p) => {
      for (let j = 0; j < arr.length; ++j) {
        if (p._id == arr[j].parentId) {
          p.childrens.push(arr[j]);
          arr[j].parent = p;
          p = arr[j];
          arr.splice(j, 1);
          return makeTree(arr, p)
        }
      }
      if (!p.parent) {
        return null;
      }
      else {
        p = p.parent;
        return makeTree(arr, p);
      }
    };
    this.dataService.getData('menu').subscribe(data => {
      let k = 0;
      data['menus'].forEach(menu => {
        if (!menu.parent) {
          let obj: Tree = {
            name: menu.title.en,
            id: k++,
            _id: menu._id,
            parentId: null,
            parent: null,
            childrens: [],
            options : {
              showActionButtons : false
            }
        }
          ;
          parentArr.push(obj);
        } else {
          let obj2: Tree = {
            name: menu.title.en,
            id: k++,
            _id: menu._id,
            parentId: menu.parent,
            childrens: [],
            options : {
              showActionButtons : false
            }
          };
          childArr.push(obj2);
        }

      });
      for (let i = 0; i < parentArr.length; ++i) {
        makeTree(childArr, parentArr[i]);
      }


      console.log('-----', childArr);
      console.log('+++++', parentArr);
      this.myTree = parentArr;
      this.done = true;
    }, (err) => {
      console.log(err);
    });
  }

  mySave() {

    //IF ELEMENT HAVE NOT PARENT PUSH PARENTNULL array
    let parentNull = [];
    //FINALY ARR LASTARR array
    let lastArr = [];
    //AFTER FILTERING LASTARR BY ID AND PARENT ALL DATA[] == LASTARR
    let data = [];

    let makeOneArrWithAllElements = (arr) => {
      for (let i = 0; i < arr.length; ++i) {
        lastArr.push(arr[i]);
        if (arr[i].childrens.length !== 0) {
          makeOneArrWithAllElements(arr[i].childrens)
        }
      }
    };

    let editParentsAndChilds = (arr, parent) => {
      for (let i = 0; i < arr.length; ++i) {
        arr[i].parentId = parent._id;
        if (arr[i].childrens !== 0) {
          editParentsAndChilds(arr[i].childrens, arr[i])
        }
      }
      return arr;
    };

    this.myTree.forEach(item => {
      item.parentId = null;
      item.parent = null;
      parentNull.push(item)
    });

    for (let i = 0; i < parentNull.length; ++i) {
      if (parentNull[i].childrens.length !== 0) {
        editParentsAndChilds(parentNull[i].childrens, parentNull[i])
      }
    }

    makeOneArrWithAllElements(parentNull);
    lastArr.forEach(item => {
      let obj = {
        id: item._id,
        parent: item.parentId,
      };
      data.push(obj)
    });
    let form = {
      data: data
    };
    this.dataService.menuUpdate(form, 'menu').subscribe(data => {
      console.log('DAta ', data)
    }, (err) => {
      console.log(err)
    })
  }

}

// ASHXATOX KOD

// data['menus'].forEach((menu,i)=>{
//   if(!menu.parent){
//     let obj = {
//       name : menu.title.en,
//       id : menu._id,
//       parentId : null,
//       childrens : []
//     };
//     parentArr.push(obj);
//     this.myTree = parentArr;
//   }else{
//     let obj2 = {
//       name : menu.title.en,
//       id : menu._id,
//       parentId : menu.parent,
//       childrens : []
//     };
//     childArr.push(obj2);
//   }
// });
// for(let i = 0; i < this.myTree.length; ++i){
//   for(let j = 0; j < childArr.length; ++j){
//     if(childArr[j].parentId == this.myTree[i].id){
//       this.myTree[i].childrens.push(childArr[j])
//     }
//   }
// }
// this.done = true;


// this.exTree = [
//   {
//     name: 'Apple',
//     id: 1,
//     childrens: [
//       {
//         name: 'Iphone',
//         id: 4,
//         childrens: []
//       }
//     ]
//   },
//   {
//     name: 'Google',
//     id: 10,
//     childrens: [
//       {
//         name: 'Google play',
//         id: 15,
//         childrens: []
//       }
//     ]
//   }
// ];
