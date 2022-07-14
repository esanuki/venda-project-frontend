import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
