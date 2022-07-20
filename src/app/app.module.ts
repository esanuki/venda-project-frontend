import { NavegacaoGuard } from './navegacao/navegacao.guard';
import { BaseGuard } from './shared/services/base.guard';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NavegacaoModule,

    AppRoutingModule
  ],
  providers: [NavegacaoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
