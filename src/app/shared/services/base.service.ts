import { HttpHeaders } from "@angular/common/http";
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
}
