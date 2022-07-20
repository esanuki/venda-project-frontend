import { LocalStorageUtil } from './../../shared/utils/local-storage-util';
import { ContaService } from './../services/conta.service';
import { User } from './../models/user';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';

import { CustomValidators } from 'ngx-custom-validators';
import { utilsBr } from 'js-brasil';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElemens: ElementRef[];

  errors: any[] = [];
  user: User;

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private service: ContaService,
    private router: Router,
    spinner: NgxSpinnerService,
    toastr: ToastrService
  ) {
    super(spinner, toastr);
    this.mensagensValidacao();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, CustomValidators.rangeLength([3,15])]]
    })
  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElemens);
  }

  login() {
    if (this.form.dirty && this.form.valid){
      this.user = Object.assign({}, this.user, this.form.value);

      this.errors = [];

      this.spinner.show();

      this.service.login(this.user)
        .subscribe(
          data => {
            this.spinner.hide();
            if (data) {
              this.form.reset();

              let toast = this.toastr.success('Login realizado com sucesso!', 'Obrigado por se registrar');
              toast.onHidden = new Observable((observer) => observer.next(data));

              if (toast) toast.onHidden.subscribe((parametro) => {
                this.localStorageUtil.saveLocalStorage(parametro);
                this.router.navigate(['/home'])
              });
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


  mensagensValidacao(): any {
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    super.configMessagesValidation(this.validationMessages);
  }

}
