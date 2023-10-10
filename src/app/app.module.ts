import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConsentComponent } from './consent/consent.component';
import { MainComponent } from './main/main.component';
import { TransferComponent } from './transfer/transfer.component';
import { ProfileComponent } from './profile/profile.component';
import {RouterOutlet} from "@angular/router";
import { MenuComponent } from './menu/menu.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ApiService} from "./api.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    ConsentComponent,
    MainComponent,
    TransferComponent,
    ProfileComponent,
    MenuComponent,
    AddWalletComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        FormsModule,
      CommonModule,
      BrowserAnimationsModule
    ],
  providers: [ApiService, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {

}
