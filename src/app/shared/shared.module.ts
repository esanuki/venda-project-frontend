import { SharedGuard } from './services/shared.guard';
import { DateDirective } from './directives/date.directive';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [DateDirective],
  exports: [DateDirective],
  providers: [SharedGuard]
})
export class SharedModule {

}
