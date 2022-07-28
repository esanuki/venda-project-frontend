import { Injectable } from "@angular/core";
import { NgbDatepickerI18n, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

const I18N_VALUES = {
  'br': {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dez'],
    weekLabel: 'sem'
  }
}

@Injectable()
export class I18n {
  language: 'br';
}

@Injectable()
export class DatePickerI18n extends NgbDatepickerI18n{

  constructor(private _i18n: I18n) {super();}

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES['br'].weekdays[weekday - 1];
  }

  getWeekdayLabel(weekday: number): string { return I18N_VALUES['br'].weekdays[weekday - 1]; }
  getWeekLabel(): string { return I18N_VALUES['br'].weekLabel; }
  getMonthShortName(month: number): string { return I18N_VALUES['br'].months[month - 1]; }
  getMonthFullName(month: number): string { return this.getMonthShortName(month); }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.day}-${date.month}-${date.year}`; }

}
