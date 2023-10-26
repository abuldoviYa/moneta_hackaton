import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HistoryService} from "../services/history.service";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../api.service";
import {BackapiService} from "../backapi.service";
import {map} from "rxjs";
import {TransactionInfo} from "../entities/transaction-info";

@Component({
  selector: 'app-history-pages-manager',
  templateUrl: './history-pages-manager.component.html',
  styleUrls: ['./history-pages-manager.component.scss']
})
export class HistoryPagesManagerComponent implements OnInit{

  @Input()
  cardNumber: string | undefined

  @Input()
  walletNumber: number | undefined

  wallets?: any[]
  cards?: any[]


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private history: HistoryService, private titleService:Title, private apiService: ApiService, private backApi: BackapiService) {
    console.log(this.walletNumber)
    this.titleService.setTitle("История" + apiService.title);


  }

  getNameAndLink(transaction: any): any[] {
    let sourceWallet;
    if(transaction.isSourceWallet){
      sourceWallet = this.wallets!
        .find(x => x.id == transaction.sourceAccountId)
      let tempString = sourceWallet.digitalWalletNumber.toString();
      sourceWallet.number = "··"+tempString.substring(tempString.length-4)
      sourceWallet.link = "/wallet/" + sourceWallet.id
    } else {
      sourceWallet = this.cards!.find(x => x.id == transaction.sourceAccountId)
      let tempString = sourceWallet.cardNumber.toString();
      sourceWallet.number = "··"+tempString.substring(tempString.length-4)
      sourceWallet.link = "/card/" + sourceWallet.id
    }

    let targetWallet;
    if(transaction.isTargetWallet){
      targetWallet = this.wallets!
        .find(x => x.id == transaction.targetAccountId)
      let tempString = targetWallet.digitalWalletNumber.toString();
      targetWallet.number = "··"+tempString.substring(tempString.length-4)
      targetWallet.link = "/wallet/" + targetWallet.id
    } else {
      targetWallet = this.cards!.find(x => x.id == transaction.targetAccountId)
      let tempString = targetWallet.cardNumber.toString();
      targetWallet.number = "··"+tempString.substring(tempString.length-4)
      targetWallet.link = "/card/" + targetWallet.id
    }
    return [sourceWallet, targetWallet]
  }

  formatNumber(balance: number){
    if (balance == 0) {return "0"}
    let k = ""
    if (balance){
      k = (Math.round(balance*100)/100).toLocaleString("ru-RU").replaceAll('.', ' ')
    }
    return k
  }

  parseDate(date: string): Date {
    let dateParts = date.split(/[ :\-]/);
    return new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0],
      +dateParts[3],
      +dateParts[4],
      +dateParts[5]
    )
  }

  picker?: any

  transactions!: TransactionInfo[];

  filteredTransactions!: any[];

  startDate?: Date | null | undefined ;
  endDate?: Date | null | undefined;

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.dateCreated)

      let startDate = new Date(this.range.value.start!);
      let endDate = new Date(this.range.value.end!);
      if (endDate! <= transactionDate) {

        return false;
      }
      if (startDate! >= transactionDate) {

        return false;
      }


      return true;
    })
      .sort(function(a,b){

        return b.dateCreated.getTime()- a.dateCreated.getTime()
      });

  }

  protected readonly console = console;

  ngOnInit(): void {
    console.log(this.walletNumber)
    let k
    if (this.cardNumber) {
      console.log(this.cardNumber)
      k = this.backApi.getTransactionsByCard(this.cardNumber)
    } else if (this.walletNumber) {
      k = this.backApi.getTransactionsByWallet(this.walletNumber)
    }
    if (k) {
      k.pipe(
        map((data: any) => {
          let tempTransactions = data.data;
          // Map date strings to JavaScript Date objects
          tempTransactions.forEach((temp: any) => {

            temp.dateCreated = this.parseDate(temp.dateCreated);
          });

          // Sort transactions by date
          tempTransactions.sort((a:any , b:any) => b.dateCreated - a.dateCreated);

          return tempTransactions;
        })).subscribe(x => {
        this.transactions = x

          this.backApi.getCards().subscribe(x=>this.cards = x.data);

          this.backApi.getWallets().subscribe(x=>this.wallets = x.data);




        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.filteredTransactions = x.filter(
          (transaction: any) => transaction.dateCreated >= today
        );
      })
    }
  }
}
