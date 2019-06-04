import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(public router: Router) {
  }

  errorHandler(e): void {
    if (e.statusCode === 401) {
      this.router.navigate(['login']);
    }
  }
}
