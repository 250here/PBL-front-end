import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class DiscussService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) {
  }

  getDiscusses(projectId) {
    const httpOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.DISCUSS_LIST + projectId, httpOptions);
  }
  getDiscuss(discussId) {
    const httpOptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.GET_DISCUSS + discussId, httpOptions);
  }

  newDiscuss(discuss) {
    let httpoptions = this.constants.jsonTokenOptions();
    return this.httpClient.post(this.constants.urls.NEW_DISCUSS, discuss, httpoptions);
  }
  replyDiscuss(reply) {
    let httpoptions = this.constants.jsonTokenOptions();
    return this.httpClient.post(this.constants.urls.NEW_REPLLY, reply, httpoptions);
  }
}
