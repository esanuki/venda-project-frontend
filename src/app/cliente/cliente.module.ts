import { MomentDateFormatter } from './../shared/providers/momentdate';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ExcluirClienteComponent } from './excluir-cliente/excluir-cliente.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClienteRoutingModule } from './cliente-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListaClienteComponent,
    NovoClienteComponent,
    EditarClienteComponent,
    ExcluirClienteComponent,
    ClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule,
    NgbModule,
    ClienteRoutingModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter },
  ],
})
export class ClienteModule { }
