import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {catchError} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Главная" + apiService.title);
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
    this.backApi.getWallets().subscribe(x=>this.wallets = x.data);

  }

    protected readonly Math = Math;
  showAllWallets:boolean = false;

  onShowAllWallets(): void {
    this.showAllWallets = !this.showAllWallets;
}

  protected readonly localStorage = localStorage;

}
