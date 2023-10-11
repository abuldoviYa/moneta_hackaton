import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() {
  }

  addToHistory(walletFrom: any, walletTo: any, amountMinus: number, amountPlus:number ): void {
    let localHistory = []
    let date = Date.now();
    let historyItem = {date: date, from : walletFrom.walletNumber, to: walletTo.walletNumber, amountMinus: amountMinus, amountPlus: amountPlus}
    if(localStorage.getItem("history")!=null){
      localHistory = JSON.parse(localStorage.getItem("history")!)
    }
    localHistory.push(historyItem)
    localStorage.setItem("history", JSON.stringify(localHistory));
  }

  getHistory() {
    return JSON.parse(localStorage.getItem("history")!)
  }
}
