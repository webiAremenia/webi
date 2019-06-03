import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Portfolio} from '../../../../_models/Portfolio';
import {DataService} from '../../../../_services/data.service';
import {Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ItemService} from '../../../../_services/item.service';

@Component({
  selector: 'app-portfolio-edit',
  templateUrl: './portfolio-edit.component.html',
  styleUrls: ['./portfolio-edit.component.css']
})
export class PortfolioEditComponent implements OnInit {
  porfolioForm: FormGroup;
  portfolio: Portfolio;
  language: String = 'en';
  done: boolean;
  public Editor = ClassicEditor;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private itemService: ItemService) {
    if (!this.itemService.portfolio) {
      this.router.navigate(['admin/portfolio']);
    }
  }

  ngOnInit() {
    this.portfolio = this.itemService.portfolio;
    this.done = true;
    this.porfolioForm = this.formBuilder.group({
      url: [this.portfolio.url, Validators.required],
      amTitle: [this.portfolio['title'].am],
      ruTitle: [this.portfolio['title'].ru],
      enTitle: [this.portfolio['title'].en, Validators.required],
      amDescription: [this.portfolio['description'].am],
      ruDescription: [this.portfolio['description'].ru],
      enDescription: [this.portfolio['description'].en, Validators.required],
      img: [this.portfolio['image']],
    });

  }

  myPortfolio() {
    const fd: any = new FormData();
    const title: {} = {
      am: this.porfolioForm.get('amTitle').value,
      ru: this.porfolioForm.get('ruTitle').value,
      en: this.porfolioForm.get('enTitle').value
    };
    const description: {} = {
      am: this.porfolioForm.get('amDescription').value,
      ru: this.porfolioForm.get('ruDescription').value,
      en: this.porfolioForm.get('enDescription').value
    };
    fd.append('url', this.porfolioForm.get('url').value);
    fd.append('img', this.porfolioForm.get('img').value);
    fd.append('title', JSON.stringify(title));
    fd.append('description', JSON.stringify(description));

    this.dataService.updateData(fd, 'portfolio', this.portfolio._id).subscribe(data => {

      if (data['success']) {
        this.router.navigate(['admin/portfolio']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  changeLanguage(language) {
    this.language = language;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.porfolioForm.get('img').setValue(file);
    }
  }

}
