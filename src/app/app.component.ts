import {Component, HostListener, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private apiService: ApiService, private router: Router) {
  }

  title = 'asasdasdasd';

  isInputFocused = false;
  @HostListener('window:focusin', ['$event'])
  onFocusIn(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  @HostListener('window:focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  consent: boolean = false;
  ngOnInit(): void {
    let wallets = this.apiService.getDigitalWallets()
    this.apiService.initializeWallets()
    localStorage.setItem("wallets", JSON.stringify(wallets))
    if(localStorage.getItem("consent") != null){
      this.consent = true;
    }


  }



  onMenuClick(link: any) {
    this.router.navigate([link])
  }

}
