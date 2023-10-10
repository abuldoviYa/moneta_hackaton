import {Component, OnInit} from '@angular/core';
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


  consent: boolean = false;
  ngOnInit(): void {
    let wallets = this.apiService.getDigitalWallets()
    localStorage.setItem("wallets", JSON.stringify(wallets))
    if(localStorage.getItem("consent") != null){
      this.consent = true;

    }
    console.log('app')
  }

}
