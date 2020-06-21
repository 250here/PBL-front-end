import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../common/Constants';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {

  constructor(
    private httpClient: HttpClient,
    private constants: Constants,
  ) { }
  getPjGrade(projectId){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.GET_GRADE_OF_PROJECT + projectId, httpoptions);
  }
  isEvaluated(){
    const httpoptions = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.IS_EVALUATED, httpoptions);
  }
}
