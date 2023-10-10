import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {AddWalletComponent} from "./add-wallet/add-wallet.component";
import {TransferComponent} from "./transfer/transfer.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'addWallet', component: AddWalletComponent },
  { path: 'transfer', component: TransferComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
