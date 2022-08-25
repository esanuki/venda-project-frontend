import { Router } from '@angular/router';
import { Cliente } from './../models/cliente';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from './../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;
  erros: string;

  dataNascimento: string;

  constructor(
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.buscar();
  }

  buscar() {
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

  open(content, cliente) {
    this.cliente = cliente;
    this.dataNascimento = moment(this.cliente.dataNascimento).format('DD/MM/YYYY');

    this.modal.open(content);
  }

  excluirCliente() {
    this.clienteService.excluir(this.cliente.id)
      .subscribe(sucess => {
        const toastr = this.toastr.success('Cliente excluido com sucesso!', 'Sucesso');
        if (toastr) {
          toastr.onHidden.subscribe(() => {
            this.buscar();
            this.modal.dismissAll();
          })
        }
      },
      error => {
        this.erros = error.error.errors;
        const toastr = this.toastr.error('Ocorreu um erro ao excluir o cliente', 'Alerta');
        if (toastr) {
          toastr.onHidden.subscribe(() => {
            this.modal.dismissAll();
          })
        }

      });
  }


}
