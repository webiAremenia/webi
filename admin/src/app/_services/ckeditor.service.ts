import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../app.globals";

@Injectable({
  providedIn: 'root'
})
export class CkeditorService {

  baseUrl;

  constructor(private http: HttpClient, global: Globals) {
    this.baseUrl = global.queryUrl + 'admin';
  }

  ckEditorSaveImage(data, url) {
    console.log(1111111)
    return this.http.post(`${this.baseUrl}/${url}/ckeditor`, data);
  }

  ckEditorDeleteImage(image) {
    return this.http.delete(`${this.baseUrl}/portfolio/ckeditor?name=${image}`);

  }

  ckDeleteDir(dir, name) {
    return this.http.delete(`${this.baseUrl}/${name}/ck/${dir}`);
  }
}
