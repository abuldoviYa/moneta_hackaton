import {Component, Inject} from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import {MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-dialog-box-sms',
  templateUrl: './dialog-box-sms.component.html',
  styleUrls: ['./dialog-box-sms.component.scss']
})
export class DialogBoxSmsComponent {
  form: any;
  code!: string
  constructor(public dialogRef: MatDialogRef<any>, @Inject(DIALOG_DATA) public data: any) {}

  log() {
    //console.log(this.code)
  }

  onCode(event: any) {
    this.code = event.target.value
  }

  enterCode() {
    //console.log(this.code)
    this.dialogRef.close(this.code);
  }
}
