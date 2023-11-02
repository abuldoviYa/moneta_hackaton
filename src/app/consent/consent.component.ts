import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent {

  agreed: boolean = false;
  selectedLang!: string

  constructor(private apiService: ApiService, private titleService:Title, private backApi: BackapiService, private translate: TranslateService) {
    this.apiService.translateTitle('consent').subscribe((translations: string[]) => {
      this.titleService.setTitle(translations[0]+ " | " +translations[1])

    })
    this.selectedLang = localStorage.getItem('lang')!

  }
  submitForm() {
    this.backApi.setConsent()
    // window.location.reload();
  }



  onLang(event: any){
    this.translate.use(event.value)
    this.selectedLang = event.value
    localStorage.setItem("lang",  this.selectedLang)
    console.log(this.selectedLang)
  }
}
