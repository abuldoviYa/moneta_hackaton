import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Wallet} from "./wallet";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackapiService {

  private host: string = "http://localhost:8080/api";
  constructor(private httpClient: HttpClient) {

  }

  getWallets(): Observable<Wallet[]> {
    let wallets: Wallet[];
    let id: number = parseInt(window.localStorage.getItem("userid")!)
    return this.httpClient.get<Wallet[]>(this.host+"/digitalwallet?id="+id);
  }
}
