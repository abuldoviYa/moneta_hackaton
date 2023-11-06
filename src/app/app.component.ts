import {Component, HostListener, OnInit} from '@angular/core';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private apiService: ApiService, private router: Router, public translate: TranslateService, private _adapter:  DateAdapter<any>) {
    translate.addLangs(['en', 'ru', 'zh']);
    translate.setDefaultLang('ru')
    let lang = localStorage.getItem('lang')
    if (lang == null){
      localStorage.setItem("lang", translate.getDefaultLang())
      lang = translate.getDefaultLang()
    }
    translate.use(lang)
    this._adapter.setLocale(lang)
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
