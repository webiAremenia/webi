import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../app.globals';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl;

  constructor(private http: HttpClient, global: Globals) {
    this.baseUrl = global.queryUrl + 'admin';
  }

  getData(url) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }

  getPagesAndCategories(url) {
    return this.http.get(`${this.baseUrl}/menu/${url}`);
  }

  sendData(data, url) {
    return this.http.post(`${this.baseUrl}/${url}`, data);
  }

  updateData(data, url, id) {
    return this.http.put(`${this.baseUrl}/${url}/${id}`, data);
  }

  getOne(url, id) {
    return this.http.get(`${this.baseUrl}/${url}/${id}`);
  }

  delete(url, id) {
    return this.http.delete(`${this.baseUrl}/${url}/${id}`);
  }

  teamUpdate(data, url) {
    return this.http.put(`${this.baseUrl}/${url}/`, data);
  }

  menuUpdate(data, url) {
    return this.http.put(`${this.baseUrl}/${url}/`, data);
  }


}
