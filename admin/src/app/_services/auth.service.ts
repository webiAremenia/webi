import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../app.globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url;
  constructor(private http: HttpClient, private global: Globals ) {
    this.url = global.queryUrl + 'admin/login';
  }

  login(user) {
    return this.http.post(this.url, user);
  }
}
