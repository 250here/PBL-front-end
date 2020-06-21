import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class DiscussService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) { }
  // newDiscuss(){
  //   let httpoptions = this.constants.jsonTokenOptions();
  //   return this.httpClient.post(this.constants.urls.ADD_PROJECT_URL, project, httpoptions);
  // }
}
