import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from './../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  clientes: Cliente[];
  erros: string;

  constructor(
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.clienteService.buscarTodos()
      .subscribe(clientes => {
        this.spinner.hide();
        this.clientes = clientes;
      },
      error => {
        this.spinner.hide();
        this.toastr.error(JSON.stringify(error))
      });
  }



}
