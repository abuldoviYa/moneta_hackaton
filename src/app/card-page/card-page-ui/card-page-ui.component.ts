import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {CardData} from "../../interfaces/CardData";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ApiService} from "../../api.service";
import {Card} from "../../entities/card";
import {ActivatedRoute} from "@angular/router";
import {parse} from "@typescript-eslint/parser";
import {timeout} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxSmsComponent} from "./dialog-box-sms/dialog-box-sms.component";

@Component({
  selector: 'app-card-page-ui',
  templateUrl: './card-page-ui.component.html',
  styleUrls: ['./card-page-ui.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ])
    ]) ,  [
  trigger('flipState', [
    state('active', style({
      transform: 'rotateY(179deg)'
    })),
    state('inactive', style({
      transform: 'rotateY(0)'
    })),
    transition('active => inactive', animate('500ms ease-out')),
    transition('inactive => active', animate('500ms ease-in'))
  ])
]
  ]

})
export class CardPageUiComponent {
  data: CardData = {
    imageId: "pDGNBK9A0sk",
    state: "default",
  };

  flip: string = 'inactive';
  smsCode= "000";
  smsEntered = false;

  showInfo: boolean = false

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  banks

  constructor(private snackBar: MatSnackBar,private apiService: ApiService, private dialog: MatDialog) {
    this.banks = apiService.getBanks()
  }


  @Input()
  card!: Card | null

  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }

  formatShortCardNumber(s: string) {

    return s.toString().substring(s.toString().length - 4)
  }

  formatFullCardNumber(cardNumber: string): string {
    // Remove any non-numeric characters
    const cleanedCardNumber = cardNumber.toString().replace(/\D/g, '');

    // Split the string into groups of 4 digits
    const groups = cleanedCardNumber.match(/(\d{1,4})/g);

    // Join the groups with space
    const formattedCardNumber = groups ? groups.join(' ') : '';

    return formattedCardNumber;
  }

  formatExpDate(date: string) {
    let k = this.parseDate(date)
    let year = (k.getFullYear() + 5).toString().substring(2)
    let month = k.getMonth().toString().padStart(2, '0')
    let final = this.showInfo ? month + " / " + year : "·· / ··"
    return final
  }

  formatCVV() {
    return this.card?.cardNumber.toString().substring(3, 6)
  }

  parseDate(date: string): Date {
    let dateParts = date.split(/[ :\-]/);
    return new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0],
      +dateParts[3],
      +dateParts[4],
      +dateParts[5]
    )
  }


  onShow() {
    this.toggleFlip()
    if(!this.smsEntered){
      this.openDialog()
    } else {
      this.onShowInfo()
    }

  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogBoxSmsComponent, {
      // height: '15rem',
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(
      data => {
        console.log(this.smsCode)
        if (data == this.smsCode){
          this.openSnackBar("Верный код", true)
          this.onShowInfo()
          this.smsEntered = true
        } else {
          this.openSnackBar("Введен неверный код", false)
        }
      }
    );
  }


  onShowInfo(){
    this.showInfo = !this.showInfo
    setTimeout(() => {
      this.showInfo = !this.showInfo
    }, 10000)
  }

  onCopy() {
    this.toggleFlip()
    this.openSnackBar("Данные скопированы", true)
  }

  openSnackBar(message: string, bool: boolean) {
    let cssClass = bool ? 'green-alert' : 'red-alert'
    this.snackBar.open(message, 'Закрыть', {
      duration: 3000, // Duration the snackbar should be visible (in milliseconds)
      verticalPosition: 'top',
      panelClass: [cssClass]
    });
  }
}
