import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{
  constructor(private apiService: ApiService) {
    console.log('MainComponent - ApiService:', apiService);
    console.log(localStorage.getItem('wallets'))
  }

  wallets?: any[] = JSON.parse(localStorage.getItem("wallets")!);

  countries? = this.apiService.getAvailablecountries();

    // Update the type based on your data model
  bankAccounts?: any[]; // Update the type based on your data model

  countryFlags = new Map<string, string>([
    ["CHN", "🇨🇳"],
    ["RUB", "🇷🇺"]
  ]);

  countrySign = new Map<string, string>([
    ["CHN", "¥"],
    ["RUB", "₽"]
  ]);





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
    if(localStorage.getItem('wallets')==null){
      this.apiService.initializeWallets();
    }
  }

    protected readonly Math = Math;
  showAllWallets:boolean = false;

  onShowAllWallets(): void {
    this.showAllWallets = !this.showAllWallets;
}
}
