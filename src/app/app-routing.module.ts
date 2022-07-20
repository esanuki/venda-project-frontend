import { NavegacaoGuard } from './navegacao/navegacao.guard';
import { BaseGuard } from './shared/services/base.guard';
import { HomeComponent } from './navegacao/home/home.component';
import { LoginComponent } from './conta/login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/conta/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NavegacaoGuard]
  },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then(m => m.ContaModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
