import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './conta.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ContaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,

    ContaRoutingModule
  ]
})
export class ContaModule { }
