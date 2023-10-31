import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  selectedLang!: string
  constructor(private apiService: ApiService, private titleService:Title,  private translate: TranslateService) {
    this.titleService.setTitle(this.translate.instant('settings') + apiService.title);
    this.selectedLang = this.translate.currentLang
    if (this.selectedLang == undefined){
      this.selectedLang = this.translate.getDefaultLang();
    }

  }

  onLang(event: any){
    this.translate.use(event.value)
    this.selectedLang = event.value
    localStorage.setItem("lang",  this.selectedLang)
    console.log(this.selectedLang)
  }


}
