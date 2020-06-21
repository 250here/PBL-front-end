import {Injectable} from '@angular/core';
import {Constants} from '../common/Constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectFileService {

  constructor(
    public constants: Constants,
    private httpClient: HttpClient,
  ) {
  }

  getSharedFiles(projectId) {
    const httpOption = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.ALL_FILE_OF_PROJECT + projectId, httpOption);
  }

  downloadSharedFile(fileId) {
    const httpOption = this.constants.tokenOptions();
    return this.httpClient.get(this.constants.urls.DOWNLOAD_FILE + fileId, httpOption);
  }

  deleteSharedFile(fileId) {
    const httpOption = this.constants.tokenOptions();
    return this.httpClient.delete(this.constants.urls.DELETE_FILE + fileId, httpOption);
  }
  uploadFile(uploadData){
    const httpOption = this.constants.tokenOptions();
    return this.httpClient.post(this.constants.urls.SHARE_FILE , uploadData , httpOption);
  }
}
