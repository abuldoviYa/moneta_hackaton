import { Injectable } from '@angular/core';
import {Axios} from "axios";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestApiService {

  users!: any[];
  constructor(private httpClient: HttpClient) {

  }

  getUsers() {
    return this.httpClient.get("https://jsonplaceholder.typicode.com/users")
  }
}
