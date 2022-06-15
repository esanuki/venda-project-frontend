import { LoginComponent } from './login/login.component';
import { ContaComponent } from './conta.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { RegistroComponent } from './registro/registro.component';

export const contaRoutes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
      {path: 'registro', component: RegistroComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(contaRoutes)],
  exports: [RouterModule]
})
export class ContaRoutingModule {}
