import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HistoryService} from "../services/history.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {WalletPost} from "../entities/wallet-post";
import {TransactionPost} from "../entities/transaction-post";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit{

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private history: HistoryService, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Переводы" + apiService.title);
  }

  ngOnInit(): void {
     this.backApi.getWallets().subscribe(x=>this.wallets=x.data);
    this.backApi.getCards().subscribe(x=>this.cards=x.data);
    }

  wallets!: any[]
  cards!: any[]
  banks = this.apiService.getBanks();
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
      console.log(this.wallets)
      this.sourceCountry = this.wallets.find(x=>x.digitalWalletNumber == this.sourceValue).country
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
      this.targetCountry = this.wallets.find(x => x.digitalWalletNumber == this.targetValue).centralBank
    }

    if(this.sourceSecond == "card" && this.sourceSecond == this.targetSecond){
      this.sourceWallet = this.cards.find(x => x.cardNumber == this.sourceValue)
      this.targetWallet = this.cards.find(x => x.cardNumber == this.targetValue)
    }
    else if(this.sourceSecond == "digitalWallet" && this.sourceSecond == this.targetSecond){
      this.sourceWallet = this.wallets.find(x => x.digitalWalletNumber == this.sourceValue)
      this.targetWallet = this.wallets.find(x => x.digitalWalletNumber == this.targetValue)
    }
    else if(this.sourceSecond == "digitalWallet" && this.targetSecond  == "card"){
      this.sourceWallet = this.wallets.find(x => x.digitalWalletNumber == this.sourceValue)
      this.targetWallet = this.cards.find(x => x.cardNumber == this.targetValue)
    }
    else if(this.sourceSecond == "card" && this.targetSecond  == "digitalWallet"){
      this.sourceWallet = this.cards.find(x => x.cardNumber == this.sourceValue)
      this.targetWallet = this.wallets.find(x => x.digitalWalletNumber == this.targetValue)
    }



    this.targetCurrency = undefined;
    this.fee = undefined;
    this.targetSum = undefined;

    if(this.sourceSecond == this.targetSecond){
    if ((this.currencyToShow == null && this.feeToShow == null) || oldSource.walletNumber != this.sourceValue || oldTarget.walletNumber != this.targetValue) {


      this.getRates()
      console.log(this.erAndFee)
      console.log(this.currencyToShow)
      console.log(this.feeToShow)

    } else {
      this.currencyToShow = 0
      this.feeToShow = 0
    }
    }
  }

  getRates() {
    this.backApi.getRates({sourceCurrency:  this.targetWallet.currency, targetCurrency: this.sourceWallet.currency}).subscribe(x=>{
        this.currencyToShow = x.body.data.exchangeRate;
        this.feeToShow = x.body.data.feeRate;
    })
  }


  erAndFee: number[] | null = null;



  currencyToShow?: number;
  feeToShow?: number;

  onValueNotEqual(value: any){
    if(this.sourceSecond!=this.targetSecond){
      this.amountTransfered = value.target.value;
      this.targetSum = parseFloat(value.target.value);
      this.targetCurrency = value.target.value;
    }
  }

  mathRoundTwo(num: number){
    return Math.round(num*100)/100
  }

  amountTransfered!: number;

  onValue(value: any) {
    console.log(this.sourceWallet)
    console.log(this.targetWallet)
    this.amountTransfered = value.target.value
    if(this.sourceSecond==this.targetSecond){
    if ((this.currencyToShow == null && this.feeToShow == null) || this.sourceWallet.walletNumber != this.sourceValue || this.targetWallet.walletNumber != this.targetValue) {

      if((this.currencyToShow != null && this.feeToShow != null) && this.sourceWallet.walletNumber == this.sourceValue && this.targetWallet.walletNumber == this.targetValue)
      {this.getRates()}

      console.log(this.currencyToShow)
      console.log(this.feeToShow)
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
      this.sourceWallet = this.wallets.find(x => x.digitalWalletNumber == this.sourceValue)
      this.targetWallet = this.wallets.find(x => x.digitalWalletNumber == this.targetValue)
      this.sourceWallet.country = this.sourceWallet.centralBank
      this.targetWallet.country = this.targetWallet.centralBank
    }
  }


  onSendTransfer(): void {
    if(this.sourceWallet.balance - this.amountTransfered >= 0){
      let isSourceWallet = this.sourceSecond == "digitalWallet" ? "true" : "false"
      let isTargetWallet = this.targetSecond == "digitalWallet" ? "true" : "false"
      this.makeTransaction(new TransactionPost(-1, this.sourceWallet.id, this.targetWallet.id, this.amountTransfered, this.sourceWallet.currency, isSourceWallet, isTargetWallet));
      console.log(this.amountTransfered)
    } else {
      this.openSnackBar('Недостаточно средств', false);
    }
    // if (this.sourceSecond == this.targetSecond){
    //   let isSourceWallet = this.sourceSecond == "digitalWallet" ? "true" : "false"
    //   let isTargetWallet = this.targetSecond == "digitalWallet" ? "true" : "false"
    //   this.makeTransaction(new TransactionPost(-1, this.sourceWallet.id, this.targetWallet.id, this.amountTransfered, this.sourceWallet.currency, isSourceWallet, isTargetWallet));
    // } else if (this.sourceSecond != this.targetSecond) {
    //   if (this.makeTransferNotEqual()) {
    //     this.openSnackBar('Перевод совершен успешно!', true);
    //     this.history.addToHistory(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
    //     this.router.navigate(['/']);
    //
    //   } else {
    //     this.openSnackBar('Недостаточно средств на счёте', false);
    //   }
    // }

    console.log("onSendTransfer")
  }
    // if (this.sourceSecond == this.targetSecond){
    //   if (this.makeTransfer()) {
    //     this.openSnackBar('Перевод совершен успешно!', true);
    //     this.history.addToHistory(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
    //     this.router.navigate(['/']);
    //
    //   } else {
    //     this.openSnackBar('Недостаточно средств на счёте', false);
    //   }
    // } else if (this.sourceSecond != this.targetSecond) {
    //   if (this.makeTransferNotEqual()) {
    //     this.openSnackBar('Перевод совершен успешно!', true);
    //     this.history.addToHistory(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!)
    //     this.router.navigate(['/']);
    //
    //   } else {
    //     this.openSnackBar('Недостаточно средств на счёте', false);
    //   }
    // }
    // console.log("onSendTransfer")




  makeTransaction(transaction: TransactionPost): void {
    this.backApi.makeTransaction(transaction).subscribe(x => {
      if (this.sourceValue == this.targetValue){
        console.log(this.sourceValue)
        console.log(this.targetValue)
        x.body.data ? this.handleSuccess() : this.handleSuccess()
      }
      x.body.data ? this.handleSuccess() : this.handleError()
    })
  }

  handleSuccess(): void {
    this.openSnackBar('Перевод совершен успешно!', true);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);  //5s
  }

  handleError(): void {
    this.openSnackBar('Что-то пошло не так', false);
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


  protected readonly Math = Math;

}
