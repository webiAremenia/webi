import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: String = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {
  }

  getData(url) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }

  sendData(data, url) {
    return this.http.post(`${this.baseUrl}/${url}`, data);
  }

  updateData(data,url,id){
    return this.http.put(`${this.baseUrl}/${url}/${id}`, data);
  }

  getOne(url,id) {
    return this.http.get(`${this.baseUrl}/${url}/${id}`);
  }

  delete(url,id){
    return this.http.delete(`${this.baseUrl}/${url}/${id}`);
  }

  teamUpdate(data,url){
    return this.http.put(`${this.baseUrl}/${url}/`, data);

  }


}
