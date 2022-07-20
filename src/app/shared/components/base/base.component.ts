import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './../../validations/generic-form.validation';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageUtil } from '../../utils/local-storage-util';

export abstract class BaseComponent {

  form: FormGroup;
  errors: any[] = [];

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  changesNotSaves: boolean;

  localStorageUtil: LocalStorageUtil = new LocalStorageUtil();

  constructor(
    protected spinner: NgxSpinnerService,
    protected toastr: ToastrService
  ) {}

  protected configMessagesValidation(validationMessages: ValidationMessages) {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configValidation(inputsElements: ElementRef[]){
    let blurObservable: Observable<any>[] =
      inputsElements.map((element: ElementRef) => fromEvent(element.nativeElement, 'blur'));

    merge(...blurObservable).subscribe(() => this.validarForm());
  }

  protected validarForm() {
    this.displayMessage = this.genericValidator.processarMensagens(this.form);
    this.changesNotSaves = true;
  }

  processarFalha(erro: any){
    this.errors = erro.error.errors;
    if (this.errors === undefined) this.errors = ['Ocorreu um erro catastrofico!'];

    this.toastr.error('Ocorreu um erro!', 'Erro');
  }
}
