import { Component } from '@angular/core';
import {ApiService} from "../../api.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  constructor(private apiService: ApiService, private titleService:Title) {
    this.titleService.setTitle("Профиль" + apiService.title);
  }

  user = {
    firstname: "Иван",
    surname: "Иванов",
    country: "Россия",
    phone: "+7 (888) 888-88-88",
    email: "ivan.ivanov@mail.ru",
  }
}
