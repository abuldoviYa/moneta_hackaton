import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, concatMap, map, Observable, of, switchMap} from "rxjs";
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
    return this.httpClient.get<any>(this.host + "/digitalwallets?id=" + this.id);
  }

  getWallet(id: number): Observable<any> {
    return this.httpClient.get<any>(this.host + "/digitalwallets/" + id)
  }

  getCard(id: number): Observable<any> {
    return this.httpClient.get<any>(this.host + "/accounts/" + id)
  }

  getCards(): Observable<any> {
    return this.httpClient.get<any>(this.host + "/accounts?id=" + this.id);
  }

  //ShortCuts
  getBanks(): Observable<any> {
    return this.httpClient.get<any>(this.host + "/banks").pipe(
      map(data => {
        let tempItem = data.data.find((x: { bankName: string; }) => x.bankName == "Center-invest Bank")
        data.data = [tempItem, ...data.data.filter((item: { bankName: string; }) => item.bankName !== 'Center-invest Bank')]
        return data;
      })
    )
  }

  getTransactionsByWallet(digitalWalletNumber: number): Observable<any> {
    return this.httpClient.get<any>(this.host + "/transactions/digitalwalletnumber?id=" + digitalWalletNumber)
  }

  getTransactionsByCard(cardnumber: any): Observable<any> {
    return this.httpClient.get<any>(this.host + "/transactions/cardnumber?id=" + cardnumber)
  }

  getRates(currencies: any): Observable<any> {
    return this.httpClient.post<any>(this.host + "/transferrate", currencies, {
      observe: "response"
    })
  }

  addNewCard(card: CardPost): Observable<any> {
    card.userId = this.id
    return this.httpClient.post<any>(this.host + "/accounts", card, {
      observe: "response"
    })
  }

  addNewCardAlternative(card: CardPost): Observable<any> {
    return this.httpClient.post<any>(this.host + "/accounts", card, {
      observe: "response"
    })
  }

  addNewWallet(wallet: WalletPost): Observable<any> {
    wallet.userId = this.id
    return this.httpClient.post<any>(this.host + "/digitalwallets", wallet, {
      observe: "response"
    })
  }

  makeTransaction(transaction: TransactionPost): Observable<any> {
    transaction.userId = this.id
    //console.log(transaction)
    if (!transaction.isSourceWallet && !transaction.isTargetWallet) {
      return this.httpClient.post<any>(this.host + "/quicktransactions", transaction, {
        observe: "response"
      })
    } else {
      return this.httpClient.post<any>(this.host + "/transactions", transaction, {
        observe: "response"
      })
    }
  }

  getTransactions(): Observable<any> {
    return this.httpClient.get<any>(this.host + "/transactions?id=" + this.id);
  }



  setConsent() {
    let bank: any = {
      "userId": "10",
      "balance": "50000",
      "bankName": "СentrInvest"
    }
    let randomString = this.generateRandomString();

    let user: any = {
      "email": randomString + "@yandex.ru",
      "login": randomString,
      "password": "test",
      "firstName": "test",
      "lastName": "test",
      "role" : "USER"
    }

    this.httpClient.post<any>(this.host+"/register", user,{
      observe: "response"
    })
        .subscribe(s => {
          this.addNewCardAlternative(new CardPost(s.body.data.id, "Center-invest Bank", 1000000)).subscribe()
          localStorage.setItem("consent", "true")
          localStorage.setItem("id", s.body.data.id)
          window.location.reload()
      });
      }

  generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }
}
