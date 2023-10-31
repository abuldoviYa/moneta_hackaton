import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private apiService: ApiService, private titleService:Title, private translate: TranslateService) {
    this.titleService.setTitle(this.translate.instant('profile') + apiService.title);
  }

    menu: Map<string, any> = new Map([
                   ['profile', {title: this.translate.instant('profile'), link: "info", icon: "account_circle"}],
                   ['support', {title: this.translate.instant('support'), link: "support", icon: "contact_support"}],
                   ['settings', {title: this.translate.instant('settings'), link: "settings", icon: "settings"}],
                   ['app', {title:this.translate.instant('aboutApp'), link: "app", icon: "info"}],
                 ]);
             }
