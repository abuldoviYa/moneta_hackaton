import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../services/history.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../api.service";
import {BackapiService} from "../backapi.service";
import {TransactionInfo} from "../entities/transaction-info";
import {map} from "rxjs";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{

  wallets?: any[]
  cards?: any[]


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private history: HistoryService, private titleService:Title, private apiService: ApiService, private backApi: BackapiService) {
    this.titleService.setTitle("История" + apiService.title);
    this.backApi.getTransactions().pipe(
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

      this.backApi.getWallets().subscribe(x=>this.wallets = x.data);
      this.backApi.getCards().subscribe(x=>this.cards = x.data);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.filteredTransactions = x.filter(
        (transaction: any) => transaction.dateCreated >= today
      );
    })
  }

  getNameAndLink(transaction: any): any[] {
    //console.log(transaction)
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
    //this.transactions = this.history.getHistory();
    // if(this.transactions!=null){
    //   let date1 =  new Date();
    //   date1.setDate(date1.getDate() - 1)
    //   let date2 = new Date();
    //   date2.setDate(date2.getDate() + 1)
    //   this.range.value.start = date1
    //   this.range.value.end = date2
    //   //this.filteredTransactions = this.transactions.map(x=>x.date = new Date(x.date));
    //   this.filterTransactions()
    //
    // }


  }
}
