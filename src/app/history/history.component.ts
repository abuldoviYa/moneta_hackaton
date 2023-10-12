import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../services/history.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../api.service";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit{

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(private history: HistoryService, private titleService:Title, private apiService: ApiService) {
    this.titleService.setTitle("История" + apiService.title);

  }

  picker?: any

  transactions!: any[];

  filteredTransactions!: any[];

  startDate?: Date | null | undefined ;
  endDate?: Date | null | undefined;

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)

      let startDate = new Date(this.range.value.start!);
      let endDate = new Date(this.range.value.end!);
      if (endDate! <= transactionDate) {

        return false;
      }
      if (startDate! >= transactionDate) {

        return false;
      }


      return true;
    }).sort(function(a,b){

      return b.date.getTime()- a.date.getTime()
    });

  }

  protected readonly console = console;

  ngOnInit(): void {
    this.transactions = this.history.getHistory();
    if(this.transactions!=null){
      let date1 =  new Date();
      date1.setDate(date1.getDate() - 1)
      let date2 = new Date();
      date2.setDate(date2.getDate() + 1)
      this.range.value.start = date1
      this.range.value.end = date2
      this.filteredTransactions = this.transactions.map(x=>x.date = new Date(x.date));
      this.filterTransactions()
    }

  }
}
