import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

Injectable();

export class Globals {
    queryUrl = environment.apiUrl;
    clientUrl = environment.clientUrl;
    imageUrl = environment.imageUrl;
}


