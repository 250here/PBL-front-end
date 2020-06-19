import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/common/Constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) { }

  public login(user) {
    return this.httpClient.post(this.constants.urls.LOGIN_URL, user);
  }
}
