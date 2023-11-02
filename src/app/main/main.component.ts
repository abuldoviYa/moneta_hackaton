import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {catchError} from "rxjs";
import {TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService, private translate: TranslateService) {
    this.apiService.translateTitle('main').subscribe((translations: string[]) => {
      this.titleService.setTitle(translations[0]+ " | " +translations[1])
    })
  }



  wallets?: any[];


  countries? = this.apiService.getAvailablecountries();







  // constructor(private bankingService: BankingService) {}
  //
  // ngOnInit() {
  //   this.fetchData();
  // }
  //
  // fetchData() {
  //   // Assuming you have methods in your service to get wallet and bank account data
  //   this.bankingService.getWallets().subscribe((wallets) => {
  //     this.wallets = wallets;
  //   });
  //
  //   this.bankingService.getBankAccounts().subscribe((bankAccounts) => {
  //     this.bankAccounts = bankAccounts;
  //   });
  // }

  protected readonly queueMicrotask = queueMicrotask;

  ngOnInit(): void {
    // if(localStorage.getItem('wallets')==null){
    //   this.apiService.initializeWallets();
    // }
    this.backApi.getWallets().subscribe(x=> {this.wallets = x.data
    this.wallets = this.wallets?.reverse()});

  }

  formatNumber(balance: number){
    return Math.max(Math.round(balance*100)/100, 0).toLocaleString("ru-RU").replaceAll('.', ' ')
  }

    protected readonly Math = Math;
  showAllWallets:boolean = false;

  onShowAllWallets(): void {
    this.showAllWallets = !this.showAllWallets;
}

  protected readonly localStorage = localStorage;

}
