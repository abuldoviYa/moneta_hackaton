import {Component} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HistoryService} from "../services/history.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private history: HistoryService) {

  }

  wallets = this.apiService.getDigitalWallets();
  countries = this.apiService.getAvailablecountries();

  sourceWallet: any
  targetWallet: any

  sourceFirst?: string;
  sourceSecond?: string;

  targetSecond?: string;

  sourceValue?: number;
  targetValue?: number;

  onSource(value: any): void {
    this.sourceSecond = value.target.value;
  }

  onTarget(value: any): void {
    this.targetSecond = value.target.value;
  }

  onSourceAccount(value: any): void {
    this.sourceValue = value.target.value;
    this.targetValue = undefined;
  }
  targetCurrency?: number;
  fee?: number;
  targetSum?: number;

  onTargetAccount(value: any): void {

    let oldSource = this.sourceWallet;
    let oldTarget = this.targetWallet
    this.targetValue = value.target.value;
    this.sourceWallet = this.wallets.find(x => x.walletNumber == this.sourceValue)
    this.targetWallet = this.wallets.find(x => x.walletNumber == this.targetValue)
    this.targetCurrency = undefined;
    this.fee = undefined;
    this.targetSum = undefined;
    console.log(this.sourceValue)
    console.log(this.targetValue)
    if (this.erAndFee == null || oldSource.walletNumber != this.sourceValue || oldTarget.walletNumber != this.targetValue) {
      this.erAndFee = this.apiService.getERandFee(this.sourceWallet, this.targetWallet);
      this.currencyToShow = this.erAndFee![0]
      this.feeToShow = this.erAndFee![1]

    }
  }


  erAndFee: number[] | null = null;



  currencyToShow?: number;
  feeToShow?: number;

  onValue(value: any) {

    if (this.erAndFee == null || this.sourceWallet.walletNumber != this.sourceValue || this.targetWallet.walletNumber != this.targetValue) {
      this.erAndFee = this.apiService.getERandFee(this.sourceWallet, this.targetWallet);
      this.currencyToShow = this.erAndFee![0]
      this.feeToShow = this.erAndFee![1]
    }
    this.sourceWallet = this.wallets.find(x => x.walletNumber == this.sourceValue)
    this.targetWallet = this.wallets.find(x => x.walletNumber == this.targetValue)

    this.targetCurrency = Math.round((value.target.value * this.currencyToShow!) * 100) / 100;
    this.fee = Math.round((value.target.value * this.feeToShow!) * 100) / 100;
    this.targetSum = parseFloat(value.target.value) + this.fee;

    console.log()
  }

  onSendTransfer(): void {
    {
      if (this.makeTransfer()) {
        this.openSnackBar('Перевод совершен успешно!', true);
        this.history.addToHistory(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
        this.router.navigate(['/']);

      } else {
        this.openSnackBar('Недостаточно средств на счёте', false);
      }
    }
    console.log("onSendTransfer")


  }

  makeTransfer(): boolean {
    return this.apiService.makeTransfer(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
  }

  openSnackBar(message: string, bool: boolean) {
    let cssClass = bool ? 'green-alert' : 'red-alert'
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000, // Duration the snackbar should be visible (in milliseconds)
      verticalPosition: 'top',
      panelClass: [cssClass]
    });
  }

  protected readonly isNaN = isNaN;

  protected readonly console = console;
}
