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

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'addWallet', component: AddWalletComponent },
  { path: 'addCard', component: AddCardComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'wallet/:id', component: WalletPageComponent},
  { path: 'card/:id', component: CardPageComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
