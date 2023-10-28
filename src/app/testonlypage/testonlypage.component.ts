import {Component, OnInit} from '@angular/core';
import {TestApiService} from "../test-api.service";

@Component({
  selector: 'app-testonlypage',
  templateUrl: './testonlypage.component.html',
  styleUrls: ['./testonlypage.component.scss']
})
export class TestonlypageComponent implements OnInit{

constructor(private apiService: TestApiService) {
}
  users!: any

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(data => this.users=data);
    //console.log(this.users)
  }


}
