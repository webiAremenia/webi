import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor() {
    }

    sendEmail(data) {
        console.log(data);
    }
}
