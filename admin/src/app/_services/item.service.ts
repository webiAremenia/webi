import {Injectable} from '@angular/core';
import {Media} from '../_models/Media';
import {Portfolio} from '../_models/Portfolio';
import {Setting} from '../_models/Setting';
import {Page} from '../_models/Page';
import {Team} from '../_models/Team';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  media: Media;
  portfolio: Portfolio;
  setting: Setting;
  page: Page;
  team: Team;

  constructor() {
  }
}
