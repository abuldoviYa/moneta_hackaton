import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  constructor(private apiService: ApiService, private titleService:Title, private translate: TranslateService) {
    this.apiService.translateTitle('profile').subscribe((translations: string[]) => {
      this.titleService.setTitle(translations[0]+ " | " +translations[1])
    })

    forkJoin([translate.get('tempUserName'), translate.get('tempUserSurName'), translate.get('ruCountry')]).subscribe((translations: string[]) => {
      // Iterate over the map and update each bank's value
      this.user.firstname = translations[0]
      this.user.surname = translations[1]
      this.user.country = translations[2]
   })
  }

  user = {
    firstname: "Иван",
    surname: "Иванов",
    country: "Россия",
    phone: "+7 (888) 888-88-88",
    email: "ivan.ivanov@mail.ru",
  }
}
