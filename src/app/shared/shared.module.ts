import { DateDirective } from './directives/date.directive';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [DateDirective],
  exports: [DateDirective]
})
export class SharedModule {

}
