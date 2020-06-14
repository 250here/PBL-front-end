import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  urlBase = 'http://localhost:8080/';
  urls = {
    LOGIN_URL: this.urlBase + '',
  }

  constructor() { }

}
