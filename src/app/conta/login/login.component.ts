import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { from } from 'rxjs';

import { CustomValidators } from 'ngx-custom-validators';
import { utilsBr } from 'js-brasil';

import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElemens: ElementRef[];

  errors: any[] = [];

  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    spinner: NgxSpinnerService,
    toastr: ToastrService
  ) {
    super(spinner, toastr);
    this.mensagensValidacao();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, CustomValidators.rangeLength([6,15])]]
    })
  }

  ngAfterViewInit(): void {
    super.configValidation(this.formInputElemens);
  }

  login() {
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
