import { User } from './../models/user';
import { CustomValidators } from 'ngx-custom-validators';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  user: User;

  constructor(
    private fb: FormBuilder,
    spinner: NgxSpinnerService,
    toastr: ToastrService
  ) {
    super(spinner, toastr);
    this.mensagensValidacao();

  }

  ngOnInit(): void {

    let senha = new FormControl('',[Validators.required, CustomValidators.rangeLength([3,15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([3,15]), CustomValidators.equalTo(senha)]);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
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
      password: {
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


    }
  }

}
