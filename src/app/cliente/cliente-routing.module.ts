import { SharedGuard } from './../shared/services/shared.guard';
import { ClienteResolve } from './services/cliente.resolve';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { ClienteComponent } from './cliente.component';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';

export const clienteRoute: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: 'novo-cliente',
        component: NovoClienteComponent,
        canActivate: [SharedGuard]
      },
      {
        path: 'editar-cliente/:id',
        component: EditarClienteComponent,
        canActivate: [SharedGuard],
        resolve: {
          cliente: ClienteResolve
        }
      },
      {
        path: 'lista-cliente',
        component: ListaClienteComponent,
        canActivate: [SharedGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(clienteRoute)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
