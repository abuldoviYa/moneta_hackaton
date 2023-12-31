import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {HistoryService} from "../services/history.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {WalletPost} from "../entities/wallet-post";
import {TransactionPost} from "../entities/transaction-post";
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit{

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private history: HistoryService, private titleService:Title, private backApi: BackapiService, private route: ActivatedRoute, private translate: TranslateService) {
    this.apiService.translateTitle('transfers').subscribe((translations: string[]) => {
      this.titleService.setTitle(translations[0]+ " | " +translations[1])
    })
  }


  ngOnInit(): void {
    let sourceWallet = this.route.snapshot.queryParamMap.get('sourceWallet');
    let sourceWalletId = this.route.snapshot.queryParamMap.get('sourceWalletId');
    let isQuery = sourceWallet && sourceWalletId
    if (isQuery){
      this.sourceSecond = sourceWallet == 'true'? "digitalWallet" : "card"
    }

     this.backApi.getWallets().subscribe(x=> {
       if(isQuery && sourceWallet == 'true'){
         let k = x.data.find((s: { id: string | null; }) => s.id == sourceWalletId)
         this.sourceValue = k.digitalWalletNumber
         this.sourceCountry = k.country
       }
       this.wallets=x.data
       }
     );
     this.backApi.getCards().subscribe(x=>{
         if(isQuery && sourceWallet == 'false'){
           let k = x.data.find((s: { id: string | null; }) => s.id == sourceWalletId)
           this.sourceValue = k.cardNumber
           this.sourceCountry = k.country
         }
         this.cards=x.data
     }

     );
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
    this.sourceSecond = value.value;
    this.sourceValue = undefined;
    this.sourceCountry = undefined;
    this.targetSecond = undefined;
    this.targetValue = undefined;
    this.targetCountry = undefined;
  }

  onTarget(value: any): void {
    this.targetSecond = value.value;
    this.targetValue = undefined;
  }

  onSourceAccount(value: any): void {
    this.sourceValue = value.value;
    this.targetSecond = undefined;
    this.targetValue = undefined;
    if(this.sourceSecond == 'card'){
      this.sourceCountry = this.cards.find(x=>x.cardNumber == this.sourceValue).country
    } else if (this.sourceSecond == 'digitalWallet') {
      //console.log(this.wallets)
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
    this.currencyToShow = undefined
    this.targetValue = value.value;
    //console.log(value.value)

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


    this.amountTransfered = undefined;
    this.targetCurrency = undefined;
    this.fee = undefined;
    this.targetSum = undefined;

    if(this.sourceSecond == this.targetSecond){
    if ((this.currencyToShow == null && this.feeToShow == null) || oldSource.walletNumber != this.sourceValue || oldTarget.walletNumber != this.targetValue) {


      this.getRates()
      //console.log(this.erAndFee)
     //console.log(this.currencyToShow)
      //console.log(this.feeToShow)

    } else {
      this.currencyToShow = 0
      this.feeToShow = 0
    }
    }
  }

  getRates() {
    this.backApi.getRates({sourceCurrency:  this.sourceWallet.currency, targetCurrency: this.targetWallet.currency}).subscribe(x=>{
        this.currencyToShow = x.body.data.exchangeRate;
        this.feeToShow = x.body.data.feeRate;
    })
  }

  formatNumber(balance: number){
    if (balance == 0) {return "0"}
    let k = ""
    if (balance){
      k = (Math.round(balance*100)/100).toLocaleString("ru-RU").replaceAll('.', ' ')
    }
    return k
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

  amountTransfered!: number | undefined;

  onValue(value: any) {
    //console.log(this.sourceWallet)
    //console.log(this.targetWallet)
    let num = value.target.value
    if(num.endsWith(".")) {
      num += "0"
    }
    //console.log(value.target.value)
    this.amountTransfered = num
    if(this.sourceSecond==this.targetSecond){
    if ((this.currencyToShow == null && this.feeToShow == null) || this.sourceWallet.walletNumber != this.sourceValue || this.targetWallet.walletNumber != this.targetValue) {

      if((this.currencyToShow != null && this.feeToShow != null) && this.sourceWallet.walletNumber == this.sourceValue && this.targetWallet.walletNumber == this.targetValue)
      {this.getRates()}

      //console.log(this.currencyToShow)
      //console.log(this.feeToShow)
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
    if(this.sourceWallet.balance - this.targetSum! >= 0){
      let isSourceWallet = this.sourceSecond == "digitalWallet" ? "true" : "false"
      let isTargetWallet = this.targetSecond == "digitalWallet" ? "true" : "false"
      this.makeTransaction(new TransactionPost(-1, this.sourceWallet.id, this.targetWallet.id, this.amountTransfered!, this.sourceWallet.currency, isSourceWallet, isTargetWallet));
      //console.log(this.amountTransfered)
    } else {
      this.openSnackBar(this.translate.instant("notEnoughMoney"), false);
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

    //console.log("onSendTransfer")
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
        //console.log(this.sourceValue)
        //console.log(this.targetValue)
        x.body.data ? this.handleSuccess() : this.handleSuccess()
      }
      x.body.data ? this.handleSuccess() : this.handleError(x.body.status)
    })
  }

  handleSuccess(): void {
    this.openSnackBar(this.translate.instant("successTransaction"), true);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);  //5s
  }

  handleError(status: string): void {
    if (status == "502"){
      this.openSnackBar(this.translate.instant("walletsNotCreated"), false);
    } else {
      this.openSnackBar(this.translate.instant("smthWrong"), false);
    }

  }

  makeTransferNotEqual(): boolean {
    return this.apiService.makeTransferNotEqual(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!, this.sourceSecond!)
  }


  makeTransfer(): boolean {
    return this.apiService.makeTransfer(this.sourceWallet, this.targetWallet, this.targetSum!, this.targetCurrency!, this.sourceSecond!)
  }

  openSnackBar(message: string, bool: boolean) {
    let cssClass = bool ? 'green-alert' : 'red-alert'
    this.snackBar.open(message, this.translate.instant("close"), {
      duration: 3000, // Duration the snackbar should be visible (in milliseconds)
      verticalPosition: 'top',
      panelClass: [cssClass]
    });
  }




  protected readonly isNaN = isNaN;

  protected readonly console = console;


  protected readonly Math = Math;

}
