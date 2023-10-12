import { Injectable } from '@angular/core';
import {Card} from "./card";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  title: string = " | Цифровой адаптер"

  wallets = [

    {
      country: "RUSSIA",
      walletNumber: "0035",
      balance: 50000,
    },
  ]
  getDigitalWallets(): any[] {
    return JSON.parse(localStorage.getItem("wallets")!)
  }

  initializeWallets(): void {
    console.log("asd" + this.wallets)
    localStorage.setItem("wallets", JSON.stringify(this.wallets))

  }

  addNewWallet(wallet: any): boolean {

    let wallets = localStorage.getItem("wallets")
    if(wallets==null || wallets == 'null'){
      let storeData: any[] = [];
      storeData.push(wallet)
      localStorage.setItem("wallets", JSON.stringify(storeData))
      return true
    } else {
      let storeData: any[] = JSON.parse(wallets);
      if(!storeData.find(x=>x.country == wallet.country)){
        console.log('selCur'+wallet.country)
        console.log(storeData.find(x=>console.log(x.country)))
        storeData.push(wallet)
        localStorage.setItem("wallets", JSON.stringify(storeData))
        return true
      }
      return false
    }
}

  er: Map<string, number> = new Map([
    ['CNY/RUB' , 13.91],
    ['RUB/CNY', 0.073],
    ['KZT/RUB' , 0.21],
    ['RUB/KZT', 4.78],
    ['CNY/KZT' , 65.43],
    ['KZT/CNY', 0.015],
  ])

  fee: number = 0.008

  getERandFee(walletFrom: any, walletTo: any, type: string): number[]|null {
    console.log(walletTo.country)
    let countries = this.getAvailablecountries();
    let currencyFrom = countries.get(walletFrom.country).currencyTicker
    let currencyTo = countries.get(walletTo.country).currencyTicker
    let ticker = currencyFrom+"/"+currencyTo

    if (this.er.get(ticker)){
      return [this.er.get(ticker)!, this.fee]
    }
    return null
  }

  makeTransferNotEqual(walletFrom: any, walletTo: any, amountMinus: number, amountPlus: number, typeFrom: string): boolean {
    //amountPlus = amountMinus;
    let localWallets!: any[]
    let localCards!: any[]



    localWallets = this.getDigitalWallets();
    localCards = this.getCards();



    let walletFromLocal: any
    let walletToLocal: any

    walletFromLocal = typeFrom == "card"
        ? localCards.find(x => x.cardNumber == walletFrom.cardNumber)
        : localWallets.find(x => {
        console.log(x.walletNumber)
        console.log(walletTo.walletNumber)
        return x.walletNumber == walletFrom.walletNumber} )


    walletToLocal = typeFrom != "card"
      ? localCards.find(x => x.cardNumber == walletTo.cardNumber)
      : localWallets.find(function(x){

        return x.walletNumber == walletTo.walletNumber})

    amountPlus = parseFloat(amountPlus.toString())
    amountMinus = parseFloat(amountMinus.toString())

    if (walletFromLocal.balance - amountMinus >=0){
      if(typeFrom == "card") {

        localCards.map(x => x.cardNumber == walletFromLocal.cardNumber ? x.balance = x.balance - amountMinus: x)
        localWallets.map(x => x.walletNumber == walletToLocal.walletNumber ? x.balance = x.balance + amountPlus : x)


      } else if (typeFrom == "digitalWallet"){
        localWallets.map(x => x.walletNumber == walletFromLocal.walletNumber ? x.balance = x.balance - amountMinus : x )
        localCards.map(x => x.cardNumber == walletToLocal.cardNumber ? x.balance = x.balance + amountPlus : x )
      }
        localStorage.setItem("cards", JSON.stringify(localCards))
        localStorage.setItem("wallets", JSON.stringify(localWallets))
      return true;
    }
    return false;
  }

  makeTransfer(walletFrom: any, walletTo: any, amountMinus: number, amountPlus: number, type: string): boolean {

    let localWallets!: any[]
    if(type == "card"){
      localWallets = this.getCards();
    } else if(type == "digitalWallet") {
      localWallets = this.getDigitalWallets();
    }

    let walletFromLocal: any
    let walletToLocal: any
    if(type == "card"){
      walletFromLocal = localWallets.find(x => x.cardNumber == walletFrom.cardNumber)
      walletToLocal= localWallets.find(x => x.cardNumber == walletTo.cardNumber)
    } else if (type == "digitalWallet"){
      walletFromLocal = localWallets.find(x => x.walletNumber == walletFrom.walletNumber)
      walletToLocal= localWallets.find(x => x.walletNumber == walletTo.walletNumber)
    }


    if (walletFromLocal.balance - amountMinus >=0){
      if(type == "card"){
        localWallets.map(x => x.cardNumber == walletFromLocal.cardNumber ? x.balance = x.balance - amountMinus : x )
        localWallets.map(x => x.cardNumber == walletToLocal.cardNumber ? x.balance = x.balance + amountPlus : x )
      } else if (type == "digitalWallet"){
        localWallets.map(x => x.walletNumber == walletFromLocal.walletNumber ? x.balance = x.balance - amountMinus : x )
        localWallets.map(x => x.walletNumber == walletToLocal.walletNumber ? x.balance = x.balance + amountPlus : x )
      }
      if(type == "card") {
      localStorage.setItem("cards", JSON.stringify(localWallets))
      }
      else if (type == "digitalWallet"){
      localStorage.setItem("wallets", JSON.stringify(localWallets))
      }
      return true;
    }
    return false;
  }


  // getAvailablecountries(): any[] {
  //   return [
  //     {name: 'Китай', currency: '¥', currencyName: 'CHN', flag: '🇨🇳'},
  //     {name: 'Рубль', currency: '₽', currencyName: 'RUB',flag: '🇷🇺'}
  //     ];
  // }

  getAvailablecountries(): Map<string, any> { return new Map([
    ['CHINA', {name: 'Китай', currencySign: '¥', currencyName: 'Юань', currencyTicker: 'CNY', flag: '🇨🇳', system: "UnionPay"}],
    ['RUSSIA', {name: 'Россия', currencySign: '₽', currencyName: 'Рубль',currencyTicker: 'RUB',flag: '🇷🇺', system: "MIR"}],
    ['KAZAKHSTAN', {name: 'Казахстан', currencySign: '₸', currencyName: 'Тенге',currencyTicker: 'KZT',flag: '🇰🇿', system: "Visa"}]
  ]);
  }

  setConsent() {
    localStorage.setItem("consent", "true")
  }

  deleteConsent() {
    localStorage.removeItem("consent")
  }


  getAvailableBanks(): Map<string, string[]> { return new Map([
    ['CHINA', ['Зеленый банк', 'Белый банк']],
    ['KAZAKHSTAN', ['Желтый банк', 'Красный банк']],
    ['RUSSIA', ['Центр-Инвест']]
  ]);
  }


  addNewCard(card: Card) {
    let cards = localStorage.getItem("cards")
    if(cards==null || cards == 'null'){
      let storeData: any[] = [];
      storeData.push(card)
      localStorage.setItem("cards", JSON.stringify(storeData))
      return true
    } else {
      let storeData: any[] = JSON.parse(cards);
      if(!storeData.find(x=>x.bank == card.bank)){
        storeData.push(card)
        localStorage.setItem("cards", JSON.stringify(storeData))
        return true
      }
      return false
    }
  }

  getCards(): any[] {
    return JSON.parse(localStorage.getItem("cards")!)
  }
}
