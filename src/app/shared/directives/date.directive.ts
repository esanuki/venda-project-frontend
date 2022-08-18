import { Directive, OnChanges, OnInit,  ElementRef, HostListener, Input, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input('form') form : FormGroup
  @Input('controlName') controlName : string;
  constructor(private e: ElementRef) { }

  @HostListener('change', ['$event.target.value']) dateChange(value) {
    let dataSplit = value.split('/');
    const year = dataSplit[2];
    const date = dataSplit[0];
    const month = dataSplit[1];
    let newDate = new Date(year, month -1, date);

    if (isNaN(newDate.getDate())) {
      let fdate = moment(newDate).format('YYYY-MM-DD');
      this.form.get(this.controlName).setValue(fdate);
    }

  }

}
