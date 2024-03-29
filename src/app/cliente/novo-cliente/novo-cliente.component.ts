import { ClienteService } from './../services/cliente.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18n, DatePickerI18n } from './../../shared/providers/datepicker-i18n';
import { StringUtil } from './../../shared/utils/string-util';
import { Cliente } from './../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControlName, FormBuilder, Validators } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { MensagemSucesso } from 'src/app/shared/models/mensagem-sucesso';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: DatePickerI18n}]
})
export class NovoClienteComponent extends BaseComponent implements OnInit,AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElemens: ElementRef[];
  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  errors: any[] = [];

  MASKS = utilsBr.MASKS;

  constructor(
    spinner: NgxSpinnerService,
    toastr: ToastrService,
    router: Router,
    config: NgbInputDatepickerConfig,
    private fb: FormBuilder,
    private clienteService: ClienteService) {

      super(spinner, toastr, router);
      config.placement = ['auto'];

      this.mensagensValidacao();
  }

  ngOnInit(): void {
    this.geraForm()
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

  cadastrar() {

    if (this.form.dirty && this.form.valid) {
      this.spinner.show();

      let cliente = this.form.getRawValue() as Cliente;
      cliente.cpf = StringUtil.somenteNumeros(cliente.cpf);
      cliente.endereco.cep = StringUtil.somenteNumeros(cliente.endereco.cep);

      this.clienteService.cadastrar(cliente)
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
      super.processarSucesso({mensagem: 'Cliente cadastrado com sucesso', titulo: 'Sucesso!'}, 'cliente/lista-cliente');
  }

}
