import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Card} from "../card";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router, private titleService:Title) {
    this.titleService.setTitle("Добавить карту" + apiService.title);

    console.log('AddCardComponent - ApiService:', apiService);
  }

  countries = this.apiService.getAvailablecountries();
  banks = this.apiService.getAvailableBanks()

  selectedCountry: string = "";
  selectedBank: string = "";
  consentAgreement: boolean = false;

  onBank(event: any): void {
    this.selectedBank = event.target.value;
  }

  onCountry(country: string): void {
    this.selectedCountry = country;
  }

  updateBanks(event: any): void {
    this.onCountry(event.target.value)
  }

  onSubmit(): void {
    if (this.postNewCard()) {
      this.openSnackBar('Карта успешно создана!', true);
      this.router.navigate(['/']);
    } else {
      this.openSnackBar('Карта в этом банке уже открыта', false);
    }
  }

  updateConsentAgreement() {
    this.consentAgreement = !this.consentAgreement;
  }

  postNewCard(): boolean {
    let card: Card = new Card(this.selectedCountry, this.selectedBank,Math.floor(Math.random() * 10000).toString(), 1000, 'DIGITAL', this.countries.get(this.selectedCountry).system)
    return this.apiService.addNewCard(card)
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
    this.banks = this.apiService.getAvailableBanks()

    this.selectedCountry = "";
    this.selectedBank = "";
    this.consentAgreement = false;
  }

  countriesEntries() {
    return Array.from(this.countries.keys())
  }
}
