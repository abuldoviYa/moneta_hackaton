import {Component, inject} from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {ActivatedRoute} from "@angular/router";
import {Bank} from "../entities/bank";
import {Card} from "../entities/card";
import {map} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent {

  route: any
  transactionId: number
  cards!: any[]
  wallets!: any[]
  transaction!: any

  constructor(private apiService: ApiService, private titleService: Title, private backApi: BackapiService, private translate: TranslateService) {
    this.apiService.translateTitle('transaction').subscribe((translations: string[]) => {
      this.titleService.setTitle(translations[0]+ " | " +translations[1])
    })
    this.route = inject(ActivatedRoute);
    this.transactionId = parseInt(this.route.snapshot.paramMap.get('id')!)
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {

          //console.log(this.cardNumber)
         let k = this.backApi.getTransactionById(id)

        if (k) {
          k.pipe(
            map((data: any) => {
              let tempTransaction = data.data;
              tempTransaction.dateCreated = this.parseDate(tempTransaction.dateCreated);
              let tempTransactions: any[] = tempTransaction.transactionHistory

              if(tempTransactions.length>0) {
              // Map date strings to JavaScript Date objects
                tempTransactions.forEach((temp: any) => {

                temp.dateCreated = this.parseDate(temp.dateCreated);
              });
              }
              tempTransaction.transactionHistory = tempTransactions;

              return tempTransaction;
            })).subscribe(x => {
            this.transaction = x

            this.backApi.getCards().subscribe(x=>this.cards = x.data);
            this.backApi.getWallets().subscribe(x=>this.wallets = x.data);

            const today = new Date();
            today.setHours(0, 0, 0, 0);
          })
        }
      }
    }



  getNameAndLink(transaction: any): any[] {
    let sourceWallet;
    if(transaction.isSourceWallet){
      sourceWallet = this.wallets!
        .find(x => x.id == transaction.sourceId)
      let tempString = sourceWallet.digitalWalletNumber.toString();
      sourceWallet.number = "··"+tempString.substring(tempString.length-4)
      sourceWallet.link = "/wallet/" + sourceWallet.id
    } else {
      sourceWallet = this.cards!.find(x => x.id == transaction.sourceId)
      let tempString = sourceWallet.cardNumber.toString();
      sourceWallet.number = "··"+tempString.substring(tempString.length-4)
      sourceWallet.link = "/card/" + sourceWallet.id
    }

    let targetWallet;
    if(transaction.isTargetWallet){
      targetWallet = this.wallets!
        .find(x => x.id == transaction.targetId)
      let tempString = targetWallet.digitalWalletNumber.toString();
      targetWallet.number = "··"+tempString.substring(tempString.length-4)
      targetWallet.link = "/wallet/" + targetWallet.id
    } else {
      targetWallet = this.cards!.find(x => x.id == transaction.targetId)
      let tempString = targetWallet.cardNumber.toString();
      targetWallet.number = "··"+tempString.substring(tempString.length-4)
      targetWallet.link = "/card/" + targetWallet.id
    }
    return [sourceWallet, targetWallet]
  }

  formatNumber(balance: number){
    console.log(balance)
    if (balance == 0 || !isFinite(balance)) {return "0"}
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

  getFee(full: any, short: any){
    return full-short;
  }

  protected readonly Number = Number;

}

