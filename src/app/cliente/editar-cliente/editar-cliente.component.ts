import { Cliente } from './../models/cliente';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgBrazilValidators } from 'ng-brazil';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElemens: ElementRef[];

  cliente: Cliente;

  constructor(spinner: NgxSpinnerService,
    toastr: ToastrService,
    router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) {
      super(spinner, toastr, router);

      this.cliente = this.route.snapshot.data['cliente'];
    }

  ngOnInit(): void {
    this.geraForm();
  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElemens);
  }

  geraForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [''],
      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    })
  }

  mensagensValidacao(): any {
    this.validationMessages = {
      nome: {
        required: 'Informe o Nome'
      },
      cpf: {
        required: 'Informe o CPF',
        cpf: 'CPF inválido'
      },
      email: {
        required: 'Informe o E-mail'
      },
      dataNascimento: {
        required: 'Informe a Data de Nascimento'
      },
      logradouro: {
        required: 'Informe o Endereço'
      },
      cep: {
        required: 'Informe o CEP'
      },
      cidade: {
        required: 'Informe a Cidade'
      },
      estado: {
        required: 'Informe o Estado'
      }

    };

    super.configMessagesValidation(this.validationMessages);
  }

  processarSucesso(response: any): void {
    this.changesNotSaves = false;
    super.processarSucesso({mensagem: 'Cliente alterado com sucesso', titulo: 'Sucesso!'}, 'cliente/lista-cliente');
}

}
