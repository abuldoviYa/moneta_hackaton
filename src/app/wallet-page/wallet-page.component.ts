import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Wallet} from "../entities/wallet";

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent implements OnInit {
  private walletId: number;
  private route;
  countries = this.apiService.getAvailablecountries();

  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService, private router: Router) {
    this.titleService.setTitle("Карта " + apiService.title);
    this.route=inject(ActivatedRoute);
    this.walletId = parseInt(this.route.snapshot.paramMap.get('id')!)
  }

  pageState = "history"

  onState(state:string){
    this.pageState = state
  }

  wallet!: Wallet

  parseDate(date: string): Date {
    let dateParts = date.split(/[ :\-]/);
    return new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0],
      +dateParts[3],
      +dateParts[4],
      +dateParts[5]
    )
  }

  formatBalance(balance: number){
    return (Math.round(balance*100)/100).toLocaleString("ru-RU").replaceAll('.', ' ')
  }



  formatFullWalletNumber(cardNumber: string): string {
    // Remove any non-numeric characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    // Split the string into groups of 4 digits
    const groups = cleanedCardNumber.match(/(\d{1,4})/g);

    // Join the groups with space
    const formattedCardNumber = groups ? groups.join(' ') : '';

    return formattedCardNumber;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.backApi.getWallet(this.walletId).subscribe(x=> {
        this.wallet = x.data
        this.wallet.dateCreated = this.parseDate(this.wallet.dateCreated).toLocaleDateString("ru-RU");

      })

    }
  }

  onTransfer(){
    this.router.navigate(['/transfer'], {queryParams: { sourceWallet: 'true', sourceWalletId: this.wallet.id }});
    console.log("click")
  }
}
