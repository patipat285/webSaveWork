import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ConfirmDialogModule


  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
