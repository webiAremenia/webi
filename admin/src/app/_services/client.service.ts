import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../app.globals';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url;
  updateClient;

  constructor(private http: HttpClient, globals: Globals) {
    this.url = globals.queryUrl + 'client';
  }

  getClients() {
    return this.http.get(this.url);
  }

  addAccount(client) {
    return this.http.post(this.url, client);
  }

  updateAccount(id, client) {
    console.log(id);
    return this.http.put(this.url + '/' + id, client);
  }

  sendPass(id) {
    return this.http.get(this.url + '/password/' + id);
  }
}
