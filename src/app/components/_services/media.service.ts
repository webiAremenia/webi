import {Injectable} from '@angular/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Globals} from '../../app.globals';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private globals: Globals, private  http: HttpClient) {
  }

  media = this.globals.query_url + 'media';


  getMedia() {
    return this.http.get(this.media);
  }
}
