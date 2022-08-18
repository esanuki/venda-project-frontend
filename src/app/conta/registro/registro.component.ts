import { User } from './../models/user';
import { CustomValidators } from 'ngx-custom-validators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  user: User;

  constructor(
    spinner: NgxSpinnerService,
    toastr: ToastrService,
    router: Router,
    private fb: FormBuilder,
    private service: ContaService
  ) {
    super(spinner, toastr, router);
    this.mensagensValidacao();

  }

  ngOnInit(): void {

    let password = new FormControl('',[Validators.required, CustomValidators.rangeLength([3,15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([3,15]), CustomValidators.equalTo(password)]);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: password,
      confirmPassword: senhaConfirm
    });

  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElements);
  }

  mensagensValidacao(): any {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 3 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    super.configMessagesValidation(this.validationMessages);
  }

  registrar() {
    if (this.form.dirty && this.form.valid){
      this.user = Object.assign({}, this.user, this.form.value);

      this.errors = [];

      this.spinner.show();

      this.service.registrar(this.user)
        .subscribe(
          data => {
            this.spinner.hide();
            if (data) {
              this.form.reset();
              let toast = this.toastr.success('Registro realizado com sucesso!', 'Obrigado por se registrar');
              if (toast) toast.onHidden.subscribe(() => this.router.navigate(['/conta/login']));
            } else {
              this.toastr.error('Ocorreu um erro ao se registrar! Tente de novo mais tarde.', 'Ops');
            }

        },
        error => {
          this.spinner.hide();
          this.processarFalha(error)
        });


    }
  }

}
