import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Card} from "../entities/card";
import {BackapiService} from "../backapi.service";
import {Wallet} from "../entities/wallet";
import {Bank} from "../entities/bank";
import {CardPost} from "../entities/card-post";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private titleService:Title, private backApi: BackapiService) {
    this.titleService.setTitle("Добавить карту" + apiService.title);

    console.log('AddCardComponent - ApiService:', apiService);
  }

  countries = this.apiService.getAvailablecountries();
  banksMap = this.apiService.getBanks();
  banks!: any[];
  banksLoaded! :any[];

  selectedCountry: string = "";
  selectedBank: string = "";
  consentAgreement: boolean = false;

  onBank(event: any): void {
    this.selectedBank = event.target.value;
  }

  onCountry(country: string): void {
    this.selectedCountry = country;
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
    this.postNewCard()
  }

  updateConsentAgreement() {
    this.consentAgreement = !this.consentAgreement;
  }

  postNewCard(): void {
    let card: CardPost = new CardPost(-1, this.selectedBank, 1000)
    this.backApi.addNewCard(card).subscribe(x => {
      x.body.data ? this.handleSuccess() : this.handleError()
    })
  }

  handleSuccess(): void {
    this.openSnackBar('Карта успешно создана!', true);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);  //5s
  }

  handleError(): void {
    this.openSnackBar('Карта в этом банке уже открыта', false);
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
    // if (localStorage.getItem('cards') == null) {
    //   this.apiService.initializeCards();
    // }
    this.countries = this.apiService.getAvailablecountries();
    this.backApi.getBanks().subscribe(x=>{
      this.banksLoaded=x.data
    })

    this.selectedCountry = "";
    this.selectedBank = "";
    this.consentAgreement = false;
  }

  countriesEntries() {
    return Array.from(this.countries.keys())
  }



}
