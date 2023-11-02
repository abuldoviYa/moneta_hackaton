import { Injectable } from '@angular/core';
import {Card} from "./entities/card";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private translate: TranslateService, ) {

  }

  title: string = " | " + this.translate.instant('digitalAdapter')

  translateTitle(string1: string): Observable<string[]> {
    // Get translations for both strings
    const translationObservable1 = this.translate.get(string1);
    const translationObservable2 = this.translate.get('digitalAdapter');

    // Use forkJoin to wait for both translations to be ready
    return forkJoin([translationObservable1, translationObservable2]);
  }


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
    //console.log("asd" + this.wallets)
    localStorage.setItem("wallets", JSON.stringify(this.wallets))

  }

  getBanks(): Map<string, string> {
    const banks = new Map([
      ['Green Bank', 'ПАО «Зеленый банк»'],
      ['Center-invest Bank', 'ПАО КБ «Центр-инвест»'],
      ['СentrInvest', 'ПАО КБ «Центр-инвест»'],
      ['Blue Bank', 'ПАО «Синий банк»'],
      ['Red Bank', 'ПАО «Красный банк»'],
      ['Bank of China', 'АКБ «БЭНК ОФ ЧАЙНА»'],
      ['Industrial & Commercial Bank of China', 'АО «АйСиБиСи банк»'],
      ['Agricultural Bank of China', 'Сельскохозяйственный Банк Китая'],
      ['China Construction Bank', 'Строительный Банк Китая'],
      ['KZI Bank', 'KZI Банк'],
      ['Halyk bank', 'Банк Halyk'],
      ['Kaspi Bank', 'Банк Kaspi'],
      ['Ansar Bank', 'Банк Ansar'],
      ['Mellat Bank', 'Банк Mellat'],
      ['Allied Bank', 'Банк Allied'],
      ['Askari Bank', 'Банк Askari'],
      ['State Bank of India', 'Государственный банк Индии'],
      ['HDFC Bank', 'HDFC Банк'],
      ['ICICI Bank', 'Банк ICICI'],
    ]);

    // Get an array of observables for each translation
    const translationObservables = Array.from(banks.keys()).map((bank) => {
      return this.translate.get(bank);
    });

    // Use forkJoin to wait for all translations to be ready
    forkJoin(translationObservables).subscribe((translations: string[]) => {
      // Iterate over the map and update each bank's value
      Array.from(banks.entries()).forEach(([key, bank], index) => {

        banks.set(key, translations[index]);
      });



    });

    // Return the original map before translations are complete
    // console.log('Translated Banks Map:', banks);
    return banks;
  }




  getBanksLogo(): Map<string, any> {
      return new Map([
        ['Green', null],
        ['Center-invest Bank', {logo: 'assets/banks_logo/centrinvest.svg', classFront: 'centrinvest-card-front', classBack: 'centrinvest-card-back'}],
        ['Blue', null],
        ['Red',null ],
        ['Bank of China', {logo: null, classFront: 'bankofchina-card-front', classBack: 'bankofchina-card-back'}],
        ['Industrial & Commercial Bank of China', null],
        ['Agricultural Bank of China',null ],
        ['China Construction Bank', null],
      ]);
    }

  // formatNumber(balance: number){
  //   balance = parseFloat(balance.toString())
  //   if (balance == 0) {return "0"}
  //   let k = ""
  //   if (balance){
  //     k = (Math.round(balance*100)/100).toLocaleString("ru-RU").replaceAll('.', ' ')
  //   }
  //   return k
  // }







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
        //console.log(x.walletNumber)
        //console.log(walletTo.walletNumber)
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


  getAvailablecountries(): Map<string, any> {
    const countries = new Map([
      ['CHINA', {name: 'cnCountry', currencySign: '¥', currencyName: 'cnCurrency', currencyTicker: 'CNY', flag: '/assets/circle_countries/cn.svg', system: "UNION_PAY"}],
      ['RUSSIA', {name: 'ruCountry', currencySign: '₽', currencyName: 'ruCurrency',currencyTicker: 'RUB',flag: '/assets/circle_countries/ru.svg', system: "MIR"}],
      ['KAZAKHSTAN', {name: 'kzCountry', currencySign: '₸', currencyName: 'kzCurrency',currencyTicker: 'KZT',flag: '/assets/circle_countries/kz.svg', system: "UZ_CARD"}],
      ['INDIA', { name: 'inCountry', currencySign: '₹', currencyName: 'inCurrency', currencyTicker: 'INR', flag: '/assets/circle_countries/in.svg', system: "RUPEE" }],
      ['IRAN', { name: 'irCountry', currencySign: '﷼', currencyName: 'irCurrency', currencyTicker: 'IRR', flag: '/assets/circle_countries/ir.svg', system: "IRAN_PAYMENT" }],
      ['PAKISTAN', { name: 'pkCountry', currencySign: 'Rs', currencyName: 'pkCurrency', currencyTicker: 'PKR', flag: '/assets/circle_countries/pk.svg', system: "RUPEE" }],
    ]);

    // Get an array of observables for each translation
    const translationObservables = Array.from(countries.values()).map((country) => {
      return forkJoin([
        this.translate.get(country.currencyName),
        this.translate.get(country.name),
      ]);
    });

    // Use forkJoin to wait for all translations to be ready
    forkJoin(translationObservables).subscribe((translations: any[][]) => {
      // Iterate over the map and update each country's currencyName and name properties
      Array.from(countries.entries()).forEach(([key, country], index) => {
        country.currencyName = translations[index][0];
        country.name = translations[index][1];
      });

      // Now your countries map has the translated currencyName and name values
      // console.log('Translated Countries Map:', countries);
    });

    // Return the original map before translations are complete
    // console.log('Translated Countries Map:', countries);
    return countries;
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
