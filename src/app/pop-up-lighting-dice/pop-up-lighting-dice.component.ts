import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-lighting-dice',
  templateUrl: './pop-up-lighting-dice.component.html',
  styleUrls: ['./pop-up-lighting-dice.component.css']
})
export class PopUpLightingDiceComponent {
  amount:number;
  tottal:number;
constructor(@Inject(MAT_DIALOG_DATA) public data:any){
  this.amount = data.WiningCash;
  this.tottal=data.Totall;
}

}
