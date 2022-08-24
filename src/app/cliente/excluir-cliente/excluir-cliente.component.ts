import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../models/cliente';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-excluir-cliente',
  templateUrl: './excluir-cliente.component.html',
  styleUrls: ['./excluir-cliente.component.css']
})
export class ExcluirClienteComponent implements OnInit {

  cliente: Cliente;
  dataNascimento: string;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.cliente = this.route.snapshot.data['cliente'];
    this.dataNascimento = moment(this.cliente.dataNascimento).format("DD/MM/YYYY");
  }

  remove() {
    alert('Entrou no remove');
  }

}
