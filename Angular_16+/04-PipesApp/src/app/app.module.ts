import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { SharedModule } from './shared/shared.module';


import { registerLocaleData } from '@angular/common';
// language
import localeCatalan from '@angular/common/locales/ca-ES-valencia';
import localeJA from '@angular/common/locales/ja';
import localeES from '@angular/common/locales/es';

registerLocaleData( localeCatalan );
registerLocaleData( localeJA );
registerLocaleData( localeES );

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    SharedModule
  ],
  providers: [
    // DEFAULT LANGUAGE: SPANISH
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
