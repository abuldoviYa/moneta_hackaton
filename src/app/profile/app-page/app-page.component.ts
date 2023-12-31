import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent {
  constructor(private apiService: ApiService, private titleService:Title, private translate: TranslateService) {
    this.apiService.translateTitle('aboutApp').subscribe((translations: string[]) => {
      this.titleService.setTitle(translations[0]+ " | " +translations[1])
    })
  }

  menu: Map<string, any> = new Map([
    ['profile', {title: this.translate.instant('userAgreement'), link: "agreement", icon: "subject"}],
    ['support', {title: this.translate.instant('confidentialAgreement'), link: "confidential", icon: "lock"}]
  ]);

}
