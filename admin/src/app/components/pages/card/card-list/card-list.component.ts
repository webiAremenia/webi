import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Card} from '../../../../_models/Card';
import {DataService} from '../../../../_services/data.service';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

    cards: Card[];
    delete: any;
    searchTerm: '';

    constructor(
        private router: Router,
        private dataService: DataService,
        private itemService: ItemService
    ) {
    }

    ngOnInit() {
        this.dataService.getData('cards').subscribe(data => {
            this.cards = data['data'];
            console.log(data);
        }, (err) => {
            console.log(err);
        });
    }

    deleteCard(card, i) {
        this.delete = confirm('Are you want to delete?');
        if (this.delete === true) {
            this.dataService.delete('cards', card._id).subscribe(data => {
                if (data['success']) {
                    this.cards.splice(i, 1);
                } else {
                    this.router.navigate(['login']);
                }
            });
        }
    }

    updateCard(card) {
        this.itemService.card = card;
        this.router.navigate(['admin/card/edit']);
    }

    viewCard(card) {
        this.itemService.card = card;
    }

}
