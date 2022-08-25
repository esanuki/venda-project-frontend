import { map, catchError } from 'rxjs/operators';
import { Cliente } from './../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';

import { environment as env } from 'src/environments/environment';

@Injectable()
export class ClienteService extends BaseService {

  urlCliente = env.urlCliente;

  constructor(
    private httpClient : HttpClient
  ) { super();}

  cadastrar(cliente: Cliente) {
    return this.httpClient.post(this.urlCliente + '/Clientes', cliente, this.getTokenHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

  atualizar(cliente: Cliente) {
    return this.httpClient.put(this.urlCliente + '/Clientes', cliente, this.getTokenHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

  excluir(id: string) {
    return this.httpClient.delete(`${this.urlCliente}/clientes/${id}`, this.getTokenHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }

  buscarTodos() {
    return this.httpClient.get(this.urlCliente + '/Clientes', this.getTokenHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      )
  }

  buscarPorId(id: string) {
    return this.httpClient.get(`${this.urlCliente}/clientes/${id}`, this.getTokenHeader())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      );
  }
}
