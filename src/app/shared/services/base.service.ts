import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtil } from "../utils/local-storage-util";

export abstract class BaseService {

  public localStorage = new LocalStorageUtil();

  protected getHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  protected getTokenHeader(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.localStorage.getToken()}`
      })
    };
  }

  protected extractData = (response: any) => response.data || {};

  protected serviceError(response: Response | any) {
    let error: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error'){
        error.push('Ocorreu um erro desconhecido');
        response.error.errors = error;
      }
    }

    return throwError(response);
  }
}
