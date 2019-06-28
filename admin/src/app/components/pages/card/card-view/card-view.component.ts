import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../../../_services/item.service';
import {Router} from '@angular/router';
import {DataService} from '../../../../_services/data.service';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
    delete;
    card;
    done = false;

    constructor(
        private service: ItemService,
        private dataService: DataService,
        private router: Router) {
        if (!this.service.card) {
            this.router.navigate(['admin/card']);
        }
    }

    ngOnInit() {
        this.card = this.service.card;
        this.done = true;
    }

    updateCard(card) {
        this.service.card = card;
        this.router.navigate(['admin/card/edit']);
    }

    deleteCategory(card) {
        this.delete = confirm('Are you want to delete?');
        if (this.delete === true) {
            this.dataService.delete('cards', card._id).subscribe(data => {
                if (data['success']) {
                    this.router.navigate(['admin/card']);
                } else {
                    console.log('Data ', data);
                }
            }, (err) => {
                console.log(err);
            });
        }
    }

    ok() {
        this.router.navigate(['admin/card']);
    }

}
