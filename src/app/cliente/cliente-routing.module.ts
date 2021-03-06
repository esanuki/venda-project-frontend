import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { ExcluirClienteComponent } from './excluir-cliente/excluir-cliente.component';
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
        component: NovoClienteComponent
      },
      {
        path: 'editar-cliente',
        component: EditarClienteComponent
      },
      {
        path: 'excluir-cliente',
        component: ExcluirClienteComponent
      },
      {
        path: 'lista-cliente',
        component: ListaClienteComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(clienteRoute)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
