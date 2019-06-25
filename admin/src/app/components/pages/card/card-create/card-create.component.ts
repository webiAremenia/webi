import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import {Globals} from '../../../../app.globals';

@Component({
    selector: 'app-card-create',
    templateUrl: './card-create.component.html',
    styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

    myForm: FormGroup;
    language: String = 'en';
    url;
    bgColor = '#5582ca';
    textColor = '#000';

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private globals: Globals,
    ) {
        this.url = this.globals.queryUrl;
    }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            amTitle: [null],
            ruTitle: [null],
            enTitle: [null, Validators.required],
            amDescription: [null],
            ruDescription: [null],
            enDescription: [null, Validators.required],
            url: [null],
            bgColor: [null],
            textColor: [null]
        });
    }

    myNews() {
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
        form['background'] = this.bgColor;
        form['textColor'] = this.textColor;

        this.dataService.sendData(form, 'cards').subscribe(data => {
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
