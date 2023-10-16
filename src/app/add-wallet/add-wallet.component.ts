import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {Wallet} from "../entities/wallet";
import {Bank} from "../entities/bank";
import {Card} from "../entities/card";
import {WalletPost} from "../entities/wallet-post";

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent implements OnInit{

  constructor(private apiService: ApiService, private snackBar: MatSnackBar,private router: Router, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Добавить кошелек" + apiService.title);

    console.log('AddWalletComponent - ApiService:', apiService);
  }
  countries = this.apiService.getAvailablecountries();
  banksMap = this.apiService.getBanks();
  banks!: Bank[];
  banksLoaded! :any[];

  selectedCountry: string = "";
  selectedBank: string = "";
  consentAgreement: boolean = false;

  onBank(event: any): void {
    this.selectedBank = event.target.value;
  }

  onCountry(country: string): void {
    this.selectedCountry = country;
    this.selectedBank = "";
    this.banks = this.filterBanks(this.banksLoaded)
    console.log(this.banks)
  }

  filterBanks(banks: Bank[]): Bank[]{
    return banks.filter(x=>x.country==this.selectedCountry)
  }
  updateBanks(event: any): void {
    this.onCountry(event.target.value)
  }

  onSubmit(): void {
    this.postNewWallet()
  }

  updateConsentAgreement() {
    this.consentAgreement = !this.consentAgreement;
  }



  postNewWallet(): void {
    let wallet: WalletPost = new WalletPost(-1, this.selectedCountry)
    this.backApi.addNewWallet(wallet).subscribe(x => {
      x.body.data ? this.handleSuccess() : this.handleError()
    })
  }

  handleSuccess(): void {
    this.openSnackBar('Кошелек успешно создан!', true);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);  //5s
  }

  handleError(): void {
    this.openSnackBar('Такой кошелек уже существует', false);
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
    this.countries = this.apiService.getAvailablecountries();
    this.backApi.getBanks().subscribe(x=>{
      this.banksLoaded=x.data
    })

    this.selectedCountry = "";
    this.selectedBank= "";
    this.consentAgreement = false;
  }

  countriesEntries() {
    return Array.from(this.countries.keys())
  }
}
