import { ClienteService } from './cliente.service';
import { Cliente } from './../models/cliente';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ClienteResolve implements Resolve<Cliente> {

  constructor(private clienteService: ClienteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Cliente | Observable<Cliente> | Promise<Cliente> {
    return this.clienteService.buscarPorId(route.params['id']);
  }

}
