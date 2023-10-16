import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {WalletPost} from "./entities/wallet-post";
import {CardPost} from "./entities/card-post";
import {TransactionPost} from "./entities/transaction-post";

@Injectable({
  providedIn: 'root'
})
export class BackapiService {

  private host: string = "/api";

  id: number;
  constructor(private httpClient: HttpClient) {
    this.id = parseInt(window.localStorage.getItem("id")!)
  }

  getWallets(): Observable<any> {
    return this.httpClient.get<any>(this.host+"/digitalwallets?id="+this.id);
  }

  getWallet(id: number): Observable<any> {
    return this.httpClient.get<any>(this.host+"/digitalwallets/"+id)
  }

  getCard(id: number): Observable<any> {
    return this.httpClient.get<any>(this.host+"/accounts/"+id)
  }

  getCards(): Observable<any> {
    return this.httpClient.get<any>(this.host+"/accounts?id="+this.id);
  }

  //ShortCuts
  getBanks(): Observable<any> {
    return this.httpClient.get<any>(this.host+"/banks").pipe(
      map(data => {
        let tempItem = data.data.find((x: { bankName: string; })=> x.bankName == "СentrInvest")
          data.data = [tempItem, ...data.data.filter((item: { bankName: string; }) => item.bankName !== 'СentrInvest')]
        return data;
      })
    )
  }

  getRates(currencies: any): Observable<any> {
    return this.httpClient.post<any>(this.host+"/transferrate", currencies,{
      observe: "response"
    })
  }

  addNewCard(card: CardPost):Observable<any>  {
    card.userId = this.id
    return this.httpClient.post<any>(this.host+"/accounts", card,{
      observe: "response"
    })
  }

  addNewWallet(wallet: WalletPost):Observable<any>  {
    wallet.userId = this.id
    return this.httpClient.post<any>(this.host+"/digitalwallets", wallet,{
      observe: "response"
    })
  }

  makeTransaction(transaction: TransactionPost):Observable<any>  {
    transaction.userId = this.id
    return this.httpClient.post<any>(this.host+"/transactions", transaction,{
      observe: "response"
    })
  }

  getTransactions(): Observable<any> {
    return this.httpClient.get<any>(this.host+"/transactions?id="+this.id);
  }
}
