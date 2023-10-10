import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Wallet} from "../wallet";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent implements OnInit{

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,private router: Router) {
    console.log('AddWalletComponent - ApiService:', apiService);
  }
  countries = this.apiService.getAvailablecountries();
  banks = this.apiService.getAvailableBanks()

  selectedCurrency: string = "";
  selectedBank: string = "";
  consentAgreement: boolean = false;

  onBank(event: any): void {
    this.selectedBank = event.target.value;
  }

  onCountry(currency: string): void {
    this.selectedCurrency = currency;
  }
  updateBanks(event: any): void {
    this.onCountry(event.target.value)
  }

  onSubmit(): void {
    if (this.postNewWallet()) {
      this.openSnackBar('Кошелек успешно создан!', true);
      this.router.navigate(['/']);
    } else {
      this.openSnackBar('Такой кошелек уже существует', false);
    }
  }

  updateConsentAgreement() {
    this.consentAgreement = !this.consentAgreement;
  }

  postNewWallet (): boolean {
      return this.apiService.addNewWallet({country: this.selectedCurrency, walletNumber: '1234', balance : 0})
  }

  openSnackBar(message: string, bool: boolean) {
    let cssClass = bool ? 'green-alert' : 'red-alert'
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000, // Duration the snackbar should be visible (in milliseconds)
      verticalPosition: 'top',
      panelClass: [cssClass]
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('wallets')==null){
      this.apiService.initializeWallets();
    }
    this.countries = this.apiService.getAvailablecountries();
    this.banks = this.apiService.getAvailableBanks()

    this.selectedCurrency = "";
    this.selectedBank= "";
    this.consentAgreement = false;
  }

  countriesEntries() {
    return Array.from(this.countries.keys())
  }
}
