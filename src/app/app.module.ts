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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ApiService} from "./api.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBar} from "@angular/material/snack-bar";
import { HistoryComponent } from './history/history.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { CardsComponent } from './main/cards/cards.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CardPageComponent } from './card-page/card-page.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { CardPageUiComponent } from './card-page/card-page-ui/card-page-ui.component';
import { TestonlypageComponent } from './testonlypage/testonlypage.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { CardsIterationComponent } from './main/cards/cards-iteration/cards-iteration.component';
import { CardSignleComponent } from './card-page/card-signle/card-signle.component';
import { TempLoginComponent } from './util/temp-login/temp-login.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { HistoryPagesManagerComponent } from './history-pages-manager/history-pages-manager.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogBoxSmsComponent} from "./card-page/card-page-ui/dialog-box-sms/dialog-box-sms.component";
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { SettingsPageComponent } from './profile/settings-page/settings-page.component';
import { AppPageComponent } from './profile/app-page/app-page.component';
import { SupportPageComponent } from './profile/support-page/support-page.component';
import { ChatComponent } from './profile/support-page/chat/chat.component';
import {ChatService} from "./profile/support-page/chat.service";
import { ConsentTextComponent } from './consent/consent-text/consent-text.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@NgModule({
  declarations: [
    AppComponent,
    ConsentComponent,
    MainComponent,
    TransferComponent,
    ProfileComponent,
    MenuComponent,
    AddWalletComponent,
    HistoryComponent,
    CardsComponent,
    AddCardComponent,
    CardPageComponent,
    WalletPageComponent,
    CardPageUiComponent,
    TestonlypageComponent,
    CardsIterationComponent,
    CardSignleComponent,
    TempLoginComponent,
    HistoryPagesManagerComponent,
    DialogBoxSmsComponent,
    ProfilePageComponent,
    SettingsPageComponent,
    AppPageComponent,
    SupportPageComponent,
    ChatComponent,
    ConsentTextComponent,
    TransactionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatButtonModule,
    ClipboardModule,
    MatDialogModule,
    MatCheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ApiService, MatSnackBar, MatDatepickerModule,MatNativeDateModule, {provide: MAT_DATE_LOCALE, useValue: "ru-RU"}, ChatService ],
  bootstrap: [AppComponent],


})
export class AppModule {



}
export function httpTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http);
}
