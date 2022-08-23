import { ClienteService } from './../services/cliente.service';
import { utilsBr } from 'js-brasil';
import { Cliente } from './../models/cliente';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControlName, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgBrazilValidators } from 'ng-brazil';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { StringUtil } from 'src/app/shared/utils/string-util';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElemens: ElementRef[];
  @ViewChild('dataNasc') dataNasc: ElementRef;
  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  cliente: Cliente;

  MASKS = utilsBr.MASKS;

  constructor(spinner: NgxSpinnerService,
    toastr: ToastrService,
    router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService
    ) {
      super(spinner, toastr, router);

      this.geraForm();

      this.mensagensValidacao();

      this.cliente = this.route.snapshot.data['cliente'];
    }

  ngOnInit(): void {

    this.spinner.show();

    //this.preencherForm();

  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElemens);
    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  preencherForm() {
    this.form.patchValue({
      id: this.cliente.id,
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      email: this.cliente.email,
      dataNascimento: this.cliente.dataNascimento,
      endereco: {
        id: this.cliente.endereco.id,
        logradouro: this.cliente.endereco.logradouro,
        cep: this.cliente.endereco.cep,
        cidade: this.cliente.endereco.cidade,
        estado: this.cliente.endereco.estado
      }
    });
    this.dataNasc.nativeElement.value = (moment(this.cliente.dataNascimento)).format('DD/MM/YYYY');
  }

  geraForm() {
    this.form = this.fb.group({
      id: '',
      nome: ['', [Validators.required, Validators.maxLength(60)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [''],
      endereco: this.fb.group({
        id: '',
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

  update() {

    if (this.form.dirty && this.form.valid) {
      this.spinner.show();

      let cliente = this.form.getRawValue() as Cliente;
      cliente.cpf = StringUtil.somenteNumeros(cliente.cpf);
      cliente.endereco.cep = StringUtil.somenteNumeros(cliente.endereco.cep);

      this.clienteService.update(cliente)
        .subscribe(
          sucesso => {
            this.spinner.hide();
            this.processarSucesso(sucesso);
          } ,
          error => {
            this.spinner.hide();
            this.processarFalha(error)
          }
        );
    }
  }

  processarSucesso(response: any): void {
    this.changesNotSaves = false;
    super.processarSucesso({mensagem: 'Cliente alterado com sucesso', titulo: 'Sucesso!'}, 'cliente/lista-cliente');
}

}
