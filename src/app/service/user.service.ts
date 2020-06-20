import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from 'src/app/common/Constants';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }

  public login(user) {
    let jsonHttpOptions = this.constants.jsonOptions();
    let newUser = {username: user.username, password: Md5.hashStr(user.password)};
    return this.httpClient.post(this.constants.urls.LOGIN_URL, newUser, jsonHttpOptions);
  }

  public signUp(user) {
    let jsonHttpOptions = this.constants.jsonOptions();
    let newUser = {id: user.idcard, username: user.username, password: Md5.hashStr(user.password)};
    return this.httpClient.post(this.constants.urls.SIGN_UP_URL, newUser, jsonHttpOptions);
  }

  public getAvatar() {
    const tokenHttpOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.PHOTO_PATH, tokenHttpOptions);
  }

  updatePassword(passwords: any) {
    const jsonTokenOptions = this.constants.jsonTokenOptions();
    let encyprtPasswords = {
      oldPassword: Md5.hashStr(passwords.oldPassword),
      newPassword: Md5.hashStr(passwords.newPassword),
    };
    return this.httpClient.put(this.constants.urls.UPDATE_PASSWORD, encyprtPasswords, jsonTokenOptions);
  }
}
