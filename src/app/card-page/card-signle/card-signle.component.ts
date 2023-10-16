import { Component } from '@angular/core';

@Component({
  selector: 'app-card-signle',
  templateUrl: './card-signle.component.html',
  styleUrls: ['./card-signle.component.scss']
})
export class CardSignleComponent {
  rotated = false;
  rotate() {
    this.rotated = !this.rotated
 }
}
