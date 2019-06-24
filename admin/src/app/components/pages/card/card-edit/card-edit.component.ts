import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {ItemService} from '../../../../_services/item.service';
import {Card} from '../../../../_models/Card';

@Component({
    selector: 'app-card-edit',
    templateUrl: './card-edit.component.html',
    styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {

    card: Card;
    done = false;
    myForm: FormGroup;
    language: String = 'en';
    background: String;

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private itemService: ItemService
    ) {
        if (!this.itemService.card) {
            this.router.navigate(['admin/card']);
        }
    }

    ngOnInit() {
        this.card = this.itemService.card;
        this.background = this.card.background;
        this.done = true;

        this.myForm = this.formBuilder.group({
            amTitle: [this.card.title['am']],
            ruTitle: [this.card.title['ru']],
            enTitle: [this.card.title['en']],
            amDescription: [this.card.description['am']],
            ruDescription: [this.card.description['ru']],
            enDescription: [this.card.description['en'], Validators.required],
            url: [this.card.url],
            bgColor: [this.card.background]
        });
    }

    sendData() {
        const form = {};
        const title: {} = {
            am: this.myForm.get('amTitle').value,
            ru: this.myForm.get('ruTitle').value,
            en: this.myForm.get('enTitle').value
        };
        const description: {} = {
            am: this.myForm.get('amDescription').value,
            ru: this.myForm.get('ruDescription').value,
            en: this.myForm.get('enDescription').value
        };
        form['url'] = this.myForm.get('url').value;
        form['title'] = title;
        form['description'] = description;
        form['background'] = this.background;

        console.log(form);

        this.dataService.updateData(form, 'cards', this.card._id).subscribe(data => {
            if (data['success']) {
                this.router.navigate(['admin/card']);
            }
        }, (err) => {
            console.log(err);
        });
    }

    changeLanguage(language) {
        this.language = language;
    }
}
