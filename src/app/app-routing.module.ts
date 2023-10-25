import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {AddWalletComponent} from "./add-wallet/add-wallet.component";
import {TransferComponent} from "./transfer/transfer.component";
import {HistoryComponent} from "./history/history.component";
import {AddCardComponent} from "./add-card/add-card.component";
import {WalletPageComponent} from "./wallet-page/wallet-page.component";
import {CardsComponent} from "./main/cards/cards.component";
import {CardPageComponent} from "./card-page/card-page.component";
import {TestApiService} from "./test-api.service";
import {TestonlypageComponent} from "./testonlypage/testonlypage.component";
import {TempLoginComponent} from "./util/temp-login/temp-login.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfilePageComponent} from "./profile/profile-page/profile-page.component";
import {AppPageComponent} from "./profile/app-page/app-page.component";
import {SettingsPageComponent} from "./profile/settings-page/settings-page.component";
import {SupportPageComponent} from "./profile/support-page/support-page.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'addWallet', component: AddWalletComponent },
  { path: 'addCard', component: AddCardComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'wallet/:id', component: WalletPageComponent},
  { path: 'card/:id', component: CardPageComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile/info', component: ProfilePageComponent},
  { path: 'profile/settings', component: SettingsPageComponent},
  { path: 'profile/app', component: AppPageComponent},
  { path: 'profile/support', component: SupportPageComponent},
  { path: 'eee', component: TestonlypageComponent},
  { path: 'login/:id', component: TempLoginComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
