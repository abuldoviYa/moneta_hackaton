import {Component} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HistoryService} from "../services/history.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private history: HistoryService, private titleService:Title) {
    this.titleService.setTitle("Переводы" + apiService.title);
  }

  wallets = this.apiService.getDigitalWallets();
  cards = this.apiService.getCards()
  countries = this.apiService.getAvailablecountries();

  sourceWallet: any
  targetWallet: any

  sourceFirst?: string;
  sourceSecond?: string;

  sourceCountry?: string;
  targetCountry?: string;

  targetSecond?: string;

  sourceValue?: number;
  targetValue?: number;

  onSource(value: any): void {
    this.sourceSecond = value.target.value;
    this.sourceValue = undefined;
    this.sourceCountry = undefined;
    this.targetSecond = undefined;
    this.targetValue = undefined;
    this.targetCountry = undefined;
  }

  onTarget(value: any): void {
    this.targetSecond = value.target.value;
    this.targetValue = undefined;
  }

  onSourceAccount(value: any): void {
    this.sourceValue = value.target.value;
    this.targetSecond = undefined;
    this.targetValue = undefined;
    if(this.sourceSecond == 'card'){
      this.sourceCountry = this.cards.find(x=>x.cardNumber == this.sourceValue).country
    } else if (this.sourceSecond == 'digitalWallet') {
      this.sourceCountry = this.wallets.find(x=>x.walletNumber == this.sourceValue).country
    }
    this.targetValue = undefined;
    this.targetCountry = undefined;
  }
  targetCurrency?: number;
  fee?: number;
  targetSum?: number;

  onTargetAccount(value: any): void {

    let oldSource = this.sourceWallet;
    let oldTarget = this.targetWallet

    this.targetValue = value.target.value;

    if(this.targetSecond == 'card'){
      this.targetCountry = this.cards.find(x=>x.cardNumber == this.targetValue).country
    } else if (this.targetSecond == 'digitalWallet') {
      this.targetCountry = this.wallets.find(x => x.walletNumber == this.targetValue).country
    }

    if(this.sourceSecond == "card" && this.sourceSecond == this.targetSecond){
      this.sourceWallet = this.cards.find(x => x.cardNumber == this.sourceValue)
      this.targetWallet = this.cards.find(x => x.cardNumber == this.targetValue)
    }
    else if(this.sourceSecond == "digitalWallet" && this.sourceSecond == this.targetSecond){
      this.sourceWallet = this.wallets.find(x => x.walletNumber == this.sourceValue)
      this.targetWallet = this.wallets.find(x => x.walletNumber == this.targetValue)
    }
    else if(this.sourceSecond == "digitalWallet" && this.targetSecond  == "card"){
      this.sourceWallet = this.wallets.find(x => x.walletNumber == this.sourceValue)
      this.targetWallet = this.cards.find(x => x.cardNumber == this.targetValue)
    }
    else if(this.sourceSecond == "card" && this.targetSecond  == "digitalWallet"){
      this.sourceWallet = this.cards.find(x => x.cardNumber == this.sourceValue)
      this.targetWallet = this.wallets.find(x => x.walletNumber == this.targetValue)
    }



    this.targetCurrency = undefined;
    this.fee = undefined;
    this.targetSum = undefined;

    if(this.sourceSecond == this.targetSecond){
    if (this.erAndFee == null || oldSource.walletNumber != this.sourceValue || oldTarget.walletNumber != this.targetValue) {


      this.erAndFee = this.apiService.getERandFee(this.sourceWallet, this.targetWallet, this.sourceSecond!);

      this.currencyToShow = this.erAndFee![0]
      this.feeToShow = this.erAndFee![1]

    } else {
      this.currencyToShow = 0
      this.feeToShow = 0
    }
    }
  }


  erAndFee: number[] | null = null;



  currencyToShow?: number;
  feeToShow?: number;

  onValueNotEqual(value: any){
    if(this.sourceSecond!=this.targetSecond){
      this.targetSum = parseFloat(value.target.value);
      this.targetCurrency = value.target.value;
    }
  }

  mathRoundTwo(num: number){
    return Math.round(num*100)/100
  }

  onValue(value: any) {
    console.log(this.sourceWallet)
    console.log(this.targetWallet)

    if(this.sourceSecond==this.targetSecond){
    if (this.erAndFee == null || this.sourceWallet.walletNumber != this.sourceValue || this.targetWallet.walletNumber != this.targetValue) {
      this.erAndFee = this.apiService.getERandFee(this.sourceWallet, this.targetWallet, this.sourceSecond!);
      this.currencyToShow = this.erAndFee![0]
      this.feeToShow = this.erAndFee![1]
    }
      this.targetCurrency = Math.round((value.target.value * this.currencyToShow!) * 100) / 100;
      this.fee = Math.round((value.target.value * this.feeToShow!) * 100) / 100;
      this.targetSum = parseFloat(value.target.value) + this.fee;
    }
    if(this.sourceSecond == "card" && this.sourceSecond == this.targetSecond){

      this.sourceWallet = this.cards.find(x => x.cardNumber == this.sourceValue)
      this.targetWallet = this.cards.find(x => x.cardNumber == this.targetValue)
    }
    else if(this.sourceSecond == "digitalWallet" && this.sourceSecond == this.targetSecond){
      this.sourceWallet = this.wallets.find(x => x.walletNumber == this.sourceValue)
      this.targetWallet = this.wallets.find(x => x.walletNumber == this.targetValue)
    }
  }

  onSendTransfer(): void {
    if (this.sourceSecond == this.targetSecond){
      if (this.makeTransfer()) {
        this.openSnackBar('Перевод совершен успешно!', true);
        this.history.addToHistory(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
        this.router.navigate(['/']);

      } else {
        this.openSnackBar('Недостаточно средств на счёте', false);
      }
    } else if (this.sourceSecond != this.targetSecond) {
      if (this.makeTransferNotEqual()) {
        this.openSnackBar('Перевод совершен успешно!', true);
        this.history.addToHistory(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
        this.router.navigate(['/']);

      } else {
        this.openSnackBar('Недостаточно средств на счёте', false);
      }
    }
    console.log("onSendTransfer")

  }

  makeTransferNotEqual(): boolean {
    return this.apiService.makeTransferNotEqual(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!, this.sourceSecond!)
  }


  makeTransfer(): boolean {
    return this.apiService.makeTransfer(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!, this.sourceSecond!)
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
