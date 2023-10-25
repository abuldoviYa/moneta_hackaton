import { Injectable } from '@angular/core';
import {Card} from "./entities/card";


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

  getBanks(): Map<string, string> {
    return new Map([
      ['Green', 'Зеленый'],
      ['СentrInvest', 'Центр-инвест'],
      ['Blue', 'Синий'],
      ['Red', 'Красный'],
      ['Bank of China', 'Банк Китая'],
      ['Industrial & Commercial Bank of China', 'ICBC Банк'],
      ['Agricultural Bank of China', 'Сельскохозяйственный Банк Китая'],
      ['China Construction Bank', 'Строительный Банк Китая'],
    ]);
  }

    getBanksLogo(): Map<string, string|null> {
      return new Map([
        ['Green', null],
        ['СentrInvest', 'assets/banks_logo/centrinvest.svg'],
        ['Blue', null],
        ['Red',null ],
        ['Bank of China', null],
        ['Industrial & Commercial Bank of China', null],
        ['Agricultural Bank of China',null ],
        ['China Construction Bank', null],
      ]);
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


  getAvailablecountries(): Map<string, any> { return new Map([
    ['CHINA', {name: 'Китай', currencySign: '¥', currencyName: 'Юань', currencyTicker: 'CNY', flag: '/assets/circle_countries/cn.svg', system: "UNION_PAY"}],
    ['RUSSIA', {name: 'Россия', currencySign: '₽', currencyName: 'Рубль',currencyTicker: 'RUB',flag: '/assets/circle_countries/ru.svg', system: "MIR"}],
    ['UZBEKISTAN', {name: 'Узбекистан', currencySign: 'сўм', currencyName: 'Сўм', currencyTicker: 'UZS', flag: '/assets/circle_countries/uz.svg', system: "UZ_CARD"}]
    // ['KAZAKHSTAN', {name: 'Казахстан', currencySign: '₸', currencyName: 'Тенге',currencyTicker: 'KZT',flag: '🇰🇿', system: "UZ_CARD"}]
  ]);
  }


  setConsent() {
    localStorage.setItem("consent", "true")
    localStorage.setItem("id", "4")
  }

  deleteConsent() {
    localStorage.removeItem("consent")
  }

  getCards(): any[] {
    return JSON.parse(localStorage.getItem("cards")!)
  }
}
