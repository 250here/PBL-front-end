
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from 'src/app/common/Constants';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jsonHttpOptions = this.constants.jsonOptions();

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }

  public login(user) {
    let newUser = {username: user.username, password: Md5.hashStr(user.password)};
    return this.httpClient.post(this.constants.urls.LOGIN_URL, newUser, this.jsonHttpOptions);
  }

  public signUp(user) {
    let newUser = { id: user.idcard, username: user.username, password: Md5.hashStr(user.password) };
    return this.httpClient.post(this.constants.urls.SIGN_UP_URL, newUser, this.jsonHttpOptions);
  }
}
