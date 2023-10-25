import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Title} from "@angular/platform-browser";
import {BackapiService} from "../backapi.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private apiService: ApiService, private titleService:Title) {
    this.titleService.setTitle("Профиль" + apiService.title);
  }

    menu: Map<string, any> = new Map([
                   ['profile', {title: "Профиль", link: "info", icon: "account_circle"}],
                   ['support', {title: "Поддержка", link: "support", icon: "contact_support"}],
                   ['settings', {title: "Настройки", link: "settings", icon: "settings"}],
                   ['app', {title: "О приложении", link: "app", icon: "info"}],
                 ]);
             }
