import {Injectable} from '@angular/core';
import {Media} from '../_models/Media';
import {Portfolio} from '../_models/Portfolio';
import {Setting} from '../_models/Setting';
import {Page} from '../_models/Page';
import {Team} from '../_models/Team';
import {Category} from "../_models/Category";
import {Menu} from "../../../../front/src/app/components/_models/menu";
import {Language} from "../_models/Language";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  media: Media;
  portfolio: Portfolio;
  setting: Setting;
  page: Page;
  team: Team;
  category : Category;
  menu : Menu;
  menus : Menu[];
  language : Language;

  constructor() {
  }
}
