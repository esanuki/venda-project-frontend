import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'

import { BaseService } from "src/app/shared/services/base.service";

import { environment as env } from 'src/environments/environment';

@Injectable()
export class ContaService extends BaseService{

  url = env.urlConta;

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  registrar(user: User) {
    return this.http
      .post(this.url + '/login/registrar', user, this.getHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }
}
