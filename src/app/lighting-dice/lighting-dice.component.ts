import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopUpLightingDiceComponent } from '../pop-up-lighting-dice/pop-up-lighting-dice.component';

@Component({
  selector: 'app-lighting-dice',
  templateUrl: './lighting-dice.component.html',
  styleUrls: ['./lighting-dice.component.css']
})
export class LightingDiceComponent implements OnInit{
  /*********VARIABLE DICE/TIMER****** */
  RealTime:number=18;
  timeLeft: number = 16;
  interval: any;
  subscribeTimer: any;
DICE1:number;
DICE2:number;
DICE3:number;
TOTALL:number;
DOUBLE:boolean;
TRIPLE:boolean;
LOW:boolean;
HIGH:boolean;
/*************VARIBALE MONEY/YOURBET/MESSAGES************* */
winingIndex:number[]=[];
disablebutton:boolean=false;
CoefTable:number[]=[150,50,25,15,10,7,6,5,5,6,7,10,15,25,50,150];
WiningCash:number;
  yourCash:number=50;
  selectedValue:number;
   Messages: string[]=[];
   Valeurs:string[]=[];
   TotallBet:number=0;
   History:number[]=[];
   HistoryBet:string[]=[];
  constructor(private router:Router,private dialogRef : MatDialog){}
 
  ngOnInit() {
   
    
    this.interval = setInterval(() => {
   
      var idDiv=document.getElementById('divBetTime');
      var idDivTime=document.getElementById('time');
      if(this.timeLeft===16){
         for (let i = 0; i <= 19; i++){
       for(let k of this.winingIndex){
          if(i!=k){
          var id=document.getElementById('td_'+i);
          id.style.pointerEvents = 'none';
          id.style.opacity='0.4';
          }
        }
        }
      idDiv.style.backgroundColor="rgb(245, 148, 12)";
      idDiv.innerHTML="BET WILL OPEN SOON";
      idDivTime.hidden=true;
      idDiv.style.height="60px";
     
      }
      if(this.timeLeft>=13){
        for (let i = 0; i <= 19; i++){
        for(let k of this.winingIndex){
          if(i!=k){
          var id=document.getElementById('td_'+i);
          id.style.pointerEvents = 'none';
          id.style.opacity='0.4';
          }
        }
        }
      }
      if(this.timeLeft===12){
        this.winingIndex=[];
        this.TOTALL=null;
        this.disablebutton=false;
        for (let i = 0; i <= 19; i++){
          var id=document.getElementById('td_'+i);
          id.style.pointerEvents = '';
          id.style.opacity='0.8';
        }
        idDiv.style.height="30px";
        idDiv.style.backgroundColor="rgb(0, 214, 0)";
        idDiv.innerHTML="BET WILL CLOSE ";
        idDivTime.hidden=false;
        for (let i = 0; i <= 19; i++){
          var id=document.getElementById('td_'+i);
          id.style.backgroundImage = '';
        }
        this.Somme_Bet=[];
      }
      if((this.timeLeft)===0){
        for (let i = 0; i <= 19; i++){
          var id=document.getElementById('td_'+i);
          id.style.pointerEvents = 'none';
          id.style.opacity='0.4';
        }
        idDiv.style.height="60px";
        idDiv.style.backgroundColor="rgb(255, 0, 0)";
        idDiv.innerHTML="BET CLOSED ";
        idDivTime.hidden=true;
      }
      if( this.RealTime> 0) {
        if(this.timeLeft>0){
        this.timeLeft--;
        }
        this.RealTime--;
      } else {
        this.timeLeft = 16;
        this.RealTime=18;
       this.DICE1 = this.randomIntFromInterval(1, 6);
        this.DICE2 = this.randomIntFromInterval(1, 6);
        this.DICE3 = this.randomIntFromInterval(1, 6);
        this.RollingDice();
        this.TOTALL=this.DICE1+this.DICE2+this.DICE3;
        this.History.push(this.TOTALL);
        if(this.TOTALL<10){
          this.LOW=true;
          this.HIGH=false;
        }
        if(this.TOTALL>11){
            this.HIGH=true;
            this.LOW=false;
        }
        if(this.TOTALL==10||this.TOTALL==11)
        {
          this.HIGH=false;
          this.LOW=false;
        }
        if(this.DICE1==this.DICE2 && this.DICE1==this.DICE3){
          this.TRIPLE=true;
        }else
        {
          this.TRIPLE=false;
        }
        if(this.DICE1==this.DICE2||this.DICE1==this.DICE3||this.DICE2==this.DICE3){
          this.DOUBLE=true;
        }
        else{
          this.DOUBLE=false;
        }
        /**********************GAIN OR LOSE******************************* */
        if(this.Valeurs.length!=0){
        this.WiningCash=0;
        var winLOW=false;
        var winHIGH=false;
        var winDOUBLE=false;
        var winTRIPLE=false;
        var numberCheck=false;
        var WiningCashFromLow=0;
        var WiningCashFromHigh=0;
        var WiningCashFromDouble=0;
        var WiningCashFromTriple=0;
        var WiningCashFromNumber=0;
         this.Valeurs.forEach(ele=>{
          let x;
         x= ele.split("/");
         if(x[0]==="LOW"&&this.LOW==true){
           WiningCashFromLow=WiningCashFromLow+Number(x[1])*2;
           winLOW=true;
           this.winingIndex.push(0);
         }
         if(x[0]==="HIGH"&&this.HIGH==true){
          WiningCashFromHigh=WiningCashFromHigh+Number(x[1])*2;
          winHIGH=true;
          this.winingIndex.push(9);
        }
        if(x[0]==="DOUBLE"&&this.DOUBLE==true){
          WiningCashFromDouble=WiningCashFromDouble+Number(x[1])*2;
          winDOUBLE=true;
          this.winingIndex.push(10);
        }
        if(x[0]==="TRIPLE"&&this.TRIPLE==true){
         WiningCashFromTriple=WiningCashFromTriple+Number(x[1])*25;
          winTRIPLE=true;
          this.winingIndex.push(19);
        }
        if(!(x[0]==="TRIPLE")&&!(x[0]==="DOUBLE")&&!(x[0]==="HIGH")&&!(x[0]==="LOW")&&(Number(x[0]))==this.TOTALL){
               let coef = this.CoefTable[Number(x[0])-3];
               WiningCashFromNumber=WiningCashFromNumber+Number(x[1])*coef;
               numberCheck=true;
               this.winingIndex.push(Number(x[0]));
        }
        if(((Number(x[0]))==this.TOTALL)&&numberCheck){
        for (let i = 3; i <= 18; i++){
          if((i!=(Number(x[0])))&&(i<=10)){
          var id=document.getElementById('td_'+(i-2));
          id.style.backgroundImage = '';
          this.Somme_Bet[i-2]=null;
          }
          if((i!=(Number(x[0])))&&(i>10)){
            var id=document.getElementById('td_'+(i));
            id.style.backgroundImage = '';
            this.Somme_Bet[i]=null;
            }
            if((i===(Number(x[0])))&&(i<=10)){
              let x= parseFloat(WiningCashFromNumber.toString()).toFixed(2);
              WiningCashFromNumber=Number(x);
              this.Somme_Bet[i-2]= Number(x);
              var td_1 = document.getElementById('td_'+(i-2));
              if(WiningCashFromNumber<0.4){
                td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
                   }
                   if((0.4<=WiningCashFromNumber)&&(WiningCashFromNumber<1)){
                    td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                       }
                       if((1<=WiningCashFromNumber)&&(WiningCashFromNumber<2)){
                        td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                           }
                           if((2<=WiningCashFromNumber)&&(WiningCashFromNumber<5)){
                            td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                               }
                               if((5<=WiningCashFromNumber)&&(WiningCashFromNumber<10)){
                                td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                                   }
               
                                   if((10<=WiningCashFromNumber)&&(WiningCashFromNumber<50)){
                                    td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                       }
                                       if(WiningCashFromNumber>=50){
                                        td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                       }
                                       td_1.style.opacity="1";
              }
            if((i===(Number(x[0])))&&(i>10)){
              let x= parseFloat(WiningCashFromNumber.toString()).toFixed(2);
              WiningCashFromNumber=Number(x);
              this.Somme_Bet[i]= Number(x);
              var td_1 = document.getElementById('td_'+i);
              if(WiningCashFromNumber<0.4){
                td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
                   }
                   if((0.4<=WiningCashFromNumber)&&(WiningCashFromNumber<1)){
                    td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                       }
                       if((1<=WiningCashFromNumber)&&(WiningCashFromNumber<2)){
                        td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                           }
                           if((2<=WiningCashFromNumber)&&(WiningCashFromNumber<5)){
                            td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                               }
                               if((5<=WiningCashFromNumber)&&(WiningCashFromNumber<10)){
                                td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                                   }
               
                                   if((10<=WiningCashFromNumber)&&(WiningCashFromNumber<50)){
                                    td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                       }
                                       if(WiningCashFromNumber>=50){
                                        td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                       }
                                       td_1.style.opacity="1";
              }
        }
      }
        if(!winLOW){
          var id=document.getElementById('td_0');
          id.style.backgroundImage = '';
          this.Somme_Bet[0]=null;
        }
        else{
            let x= parseFloat(WiningCashFromLow.toString()).toFixed(2);
               WiningCashFromLow=Number(x);
              this.Somme_Bet[0]= Number(x);
              var td_1 = document.getElementById('td_0');
              if(WiningCashFromLow<0.4){
                td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
                   }
                   if((0.4<=WiningCashFromLow)&&(WiningCashFromLow<1)){
                    td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                       }
                       if((1<=WiningCashFromLow)&&(WiningCashFromLow<2)){
                        td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                           }
                           if((2<=WiningCashFromLow)&&(WiningCashFromLow<5)){
                            td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                               }
                               if((5<=WiningCashFromLow)&&(WiningCashFromLow<10)){
                                td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                                   }
               
                                   if((10<=WiningCashFromLow)&&(WiningCashFromLow<50)){
                                    td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                       }
                                       if(WiningCashFromLow>=50){
                                        td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                       }
                                       td_1.style.opacity="1";
        }
        if(!winHIGH){
          var id=document.getElementById('td_9');
          id.style.backgroundImage = '';
          this.Somme_Bet[9]=null;
        }
         else{
            let x= parseFloat(WiningCashFromHigh.toString()).toFixed(2);
                WiningCashFromHigh=Number(x);
              this.Somme_Bet[9]= Number(x);
              var td_1 = document.getElementById('td_9');
              if(WiningCashFromHigh<0.4){
                td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
                   }
                   if((0.4<=WiningCashFromHigh)&&(WiningCashFromHigh<1)){
                    td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                       }
                       if((1<=WiningCashFromHigh)&&(WiningCashFromHigh<2)){
                        td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                           }
                           if((2<=WiningCashFromHigh)&&(WiningCashFromHigh<5)){
                            td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                               }
                               if((5<=WiningCashFromHigh)&&(WiningCashFromHigh<10)){
                                td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                                   }
               
                                   if((10<=WiningCashFromHigh)&&(WiningCashFromHigh<50)){
                                    td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                       }
                                       if(WiningCashFromHigh>=50){
                                        td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                       }
                                       td_1.style.opacity="1";
              
        }
        if(!winDOUBLE){
          var id=document.getElementById('td_10');
          id.style.backgroundImage = '';
          this.Somme_Bet[10]=null;
        }
         else{
            let x= parseFloat(WiningCashFromDouble.toString()).toFixed(2);
               WiningCashFromDouble=Number(x);
              this.Somme_Bet[10]= Number(x);
              var td_1 = document.getElementById('td_10');
              if(WiningCashFromDouble<0.4){
                td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
                   }
                   if((0.4<=WiningCashFromDouble)&&(WiningCashFromDouble<1)){
                    td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                       }
                       if((1<=WiningCashFromDouble)&&(WiningCashFromDouble<2)){
                        td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                           }
                           if((2<=WiningCashFromDouble)&&(WiningCashFromDouble<5)){
                            td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                               }
                               if((5<=WiningCashFromDouble)&&(WiningCashFromDouble<10)){
                                td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                                   }
               
                                   if((10<=WiningCashFromDouble)&&(WiningCashFromDouble<50)){
                                    td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                       }
                                       if(WiningCashFromDouble>=50){
                                        td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                       }
                                       td_1.style.opacity="1";
        }
        if(!winTRIPLE){
          var id=document.getElementById('td_19');
          id.style.backgroundImage = '';
          this.Somme_Bet[19]=null;
        }
         else{
            let x= parseFloat(WiningCashFromTriple.toString()).toFixed(2);
               WiningCashFromTriple=Number(x);
              this.Somme_Bet[19]= Number(x);
              var td_1 = document.getElementById('td_19');
              if(WiningCashFromTriple<0.4){
                td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
                   }
                   if((0.4<=WiningCashFromTriple)&&(WiningCashFromTriple<1)){
                    td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                       }
                       if((1<=WiningCashFromTriple)&&(WiningCashFromTriple<2)){
                        td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                           }
                           if((2<=WiningCashFromTriple)&&(WiningCashFromTriple<5)){
                            td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                               }
                               if((5<=WiningCashFromTriple)&&(WiningCashFromTriple<10)){
                                td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                                   }
               
                                   if((10<=WiningCashFromTriple)&&(WiningCashFromTriple<50)){
                                    td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                       }
                                       if(WiningCashFromTriple>=50){
                                        td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                       }
                                       td_1.style.opacity="1";
        }
          } );
          if(!numberCheck){
            for (let i = 3; i <= 18; i++){
              if(i<=10){
              var id=document.getElementById('td_'+(i-2));
              id.style.backgroundImage = '';
              this.Somme_Bet[i-2]=null;
              }
              if(i>10){
                var id=document.getElementById('td_'+(i));
                id.style.backgroundImage = '';
                this.Somme_Bet[i]=null;
                }
          }
        }
        this.WiningCash=WiningCashFromTriple+WiningCashFromDouble+WiningCashFromHigh+WiningCashFromLow+WiningCashFromNumber;
          if(this.WiningCash!=0){
          this.yourCash=this.yourCash+this.WiningCash;
          let y= parseFloat(this.yourCash.toString()).toFixed(2);
          this.yourCash=Number(y);
         let x= parseFloat(this.WiningCash.toString()).toFixed(2);
         this.WiningCash=Number(x);
        
          this.openDialog();
         this.WiningCash=0;
          }
          this.Messages=[];
        this.Valeurs=[];
        this.TotallBet=0;
        this.HistoryBet=this.infoMessages;
        this.infoMessages=[];
       
       
        }
        
      }
    },1000)

  }
  RollingDice(){
    var elDiceOne = document.getElementById('dice1');
    var elDiceTwo = document.getElementById('dice2');
    var elDiceThree = document.getElementById('dice3');
    var diceOne=this.DICE1;
    var diceTwo=this.DICE2;
    var diceThree=this.DICE3;
   
    for (var i = 1; i <= 6; i++) {
      elDiceOne.classList.remove('show-' + i);
      if (diceOne === i) {
        elDiceOne.classList.add('show-' + i);
      }
    }
  
    for (var k = 1; k <= 6; k++) {
      elDiceTwo.classList.remove('show-' + k);
      if (diceTwo === k) {
        elDiceTwo.classList.add('show-' + k);
      }
    } 
    for (var l = 1; l <= 6; l++) {
      elDiceThree.classList.remove('show-' + l);
      if (diceThree === l) {
        elDiceThree.classList.add('show-' + l);
      }
    } 
    setTimeout( ()=>{},1000);
  }
  openDialog(){
    this.dialogRef.open(PopUpLightingDiceComponent,{
      height:'100px',
      width:'300px',
      data : {
        Totall:this.TOTALL,
      WiningCash : this.WiningCash
      }
    });
  }
  /***************************************TABLE FUNCTION************************************************************* */
  Somme_Bet:number[]=[];
  IMG_PATH:string[]=["assets/jetons/jeton0.2.png","assets/jetons/jeton0.4.png","assets/jetons/jeton1.png","assets/jetons/jeton2.png","assets/jetons/jeton5.png","assets/jetons/jeton10.png","assets/jetons/jeton50.png"];
  infoMessages:string[]=[];
  fct_low(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
     


         let chosinNumber="LOW";
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber);
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("LOW/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
   let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
   
   //JETON
   var td_0 = document.getElementById('td_0');
   td_0.style.backgroundSize ="40px 40px";
   td_0.style.backgroundRepeat="no-repeat";
   
   
  
   let somme=0;
   this.Valeurs.forEach(ele=>{
    let x;
    
         x= ele.split("/");
         if(x[0]==="LOW"){
              somme=somme+Number(x[1]);
         }
   });
   
  
   if(somme<0.4){
    td_0.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
       }
       if((0.4<=somme)&&(somme<1)){
        td_0.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
           }
           if((1<=somme)&&(somme<2)){
            td_0.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
               }
               if((2<=somme)&&(somme<5)){
                td_0.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                   }
                   if((5<=somme)&&(somme<10)){
                    td_0.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                       }
   
                       if((10<=somme)&&(somme<50)){
                        td_0.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                           }
                           if(somme>=50){
                            td_0.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                           }
                           let z= parseFloat(somme.toString()).toFixed(2);
                           somme=Number(z);
                           if(this.infoMessages.includes(this.Somme_Bet[0]+" DT on LOW")){
                                let i =this.infoMessages.indexOf(this.Somme_Bet[0]+" DT on LOW");
                                this.infoMessages[i]=somme+" DT on LOW";
                           }else{
                           this.infoMessages.push(somme+" DT on LOW");
                           }
                           this.Somme_Bet[0]=somme;
                           
                         
    }
  }
 
  fct_3(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
  let chosinNumber=3;
  this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
  this.yourCash=this.yourCash-Number(this.selectedValue);
  this.Valeurs.push("3/"+this.selectedValue.toString());
  this.TotallBet=this.TotallBet+Number(this.selectedValue);
  let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
 //jeton
 var td_1 = document.getElementById('td_1');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="3"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[1]+" DT on 3")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[1]+" DT on 3");
                          this.infoMessages[i]=somme+" DT on 3";
                     }else{
                     this.infoMessages.push(somme+" DT on 3");
                     }
                         this.Somme_Bet[1]=somme;
                         
  }
}
  fct_4(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=4;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("4/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_2');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="4"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                        
                         if(this.infoMessages.includes(this.Somme_Bet[2]+" DT on 4")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[2]+" DT on 4");
                          this.infoMessages[i]=somme+" DT on 4";
                     }else{
                     this.infoMessages.push(somme+" DT on 4");
                     }
                     this.Somme_Bet[2]=somme;
                       
    }
  }
  fct_5(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=5;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("5/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_3');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="5"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[3]+" DT on 5")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[3]+" DT on 5");
                          this.infoMessages[i]=somme+" DT on 5";
                     }else{
                     this.infoMessages.push(somme+" DT on 5");
                     }
                         this.Somme_Bet[3]=somme;
    }
  }
  fct_6(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=6;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("6/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_4');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="6"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[4]+" DT on 6")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[4]+" DT on 6");
                          this.infoMessages[i]=somme+" DT on 6";
                     }else{
                     this.infoMessages.push(somme+" DT on 6");
                     }
                         this.Somme_Bet[4]=somme;
    }
  }
  fct_7(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=7;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("7/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_5');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="7"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[5]+" DT on 7")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[5]+" DT on 7");
                          this.infoMessages[i]=somme+" DT on 7";
                     }else{
                     this.infoMessages.push(somme+" DT on 7");
                     }
                         this.Somme_Bet[5]=somme;
    }
  }
  fct_8(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=8;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("8/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_6');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="8"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[6]+" DT on 8")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[6]+" DT on 8");
                          this.infoMessages[i]=somme+" DT on 8";
                     }else{
                     this.infoMessages.push(somme+" DT on 8");
                     }
                         this.Somme_Bet[6]=somme;
    }
  }
  fct_9(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=9;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("9/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_7');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="9"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[7]+" DT on 9")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[7]+" DT on 9");
                          this.infoMessages[i]=somme+" DT on 9";
                     }else{
                     this.infoMessages.push(somme+" DT on 9");
                     }
                         this.Somme_Bet[7]=somme;
    }
  }
  fct_10(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=10;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("10/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_8');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="10"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[8]+" DT on 10")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[8]+" DT on 10");
                          this.infoMessages[i]=somme+" DT on 10";
                     }else{
                     this.infoMessages.push(somme+" DT on 10");
                     }
                         this.Somme_Bet[8]=somme;
    }
  }
  fct_high(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber="HIGH";
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber);
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("HIGH/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_9');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="HIGH"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[9]+" DT on HIGH")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[9]+" DT on HIGH");
                          this.infoMessages[i]=somme+" DT on HIGH";
                     }else{
                     this.infoMessages.push(somme+" DT on HIGH");
                     }
                         this.Somme_Bet[9]=somme;
    }
  }
  fct_double(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber="DOUBLE";
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber);
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("DOUBLE/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_10');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="DOUBLE"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[10]+" DT on DOUBLE")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[10]+" DT on DOUBLE");
                          this.infoMessages[i]=somme+" DT on DOUBLE";
                     }else{
                     this.infoMessages.push(somme+" DT on DOUBLE");
                     }
                         this.Somme_Bet[10]=somme;
    }
  }
  fct_11(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=11;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("11/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_11');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="11"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[11]+" DT on 11")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[11]+" DT on 11");
                          this.infoMessages[i]=somme+" DT on 11";
                     }else{
                     this.infoMessages.push(somme+" DT on 11");
                     }
                         this.Somme_Bet[11]=somme;
    }
  }
  fct_12(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=12;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("12/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_12');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="12"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[12]+" DT on 12")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[12]+" DT on 12");
                          this.infoMessages[i]=somme+" DT on 12";
                     }else{
                     this.infoMessages.push(somme+" DT on 12");
                     }
                         this.Somme_Bet[12]=somme;
    }
  }
  fct_13(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=13;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("13/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_13');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="13"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[13]+" DT on 13")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[13]+" DT on 13");
                          this.infoMessages[i]=somme+" DT on 13";
                     }else{
                     this.infoMessages.push(somme+" DT on 13");
                     }
                         this.Somme_Bet[13]=somme;
    }
  }
  fct_14(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=14;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("14/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_14');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="14"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[14]+" DT on 14")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[14]+" DT on 14");
                          this.infoMessages[i]=somme+" DT on 14";
                     }else{
                     this.infoMessages.push(somme+" DT on 14");
                     }
                         this.Somme_Bet[14]=somme;
    }
  }
  fct_15(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=15;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("15/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_15');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="15"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[15]+" DT on 15")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[15]+" DT on 15");
                          this.infoMessages[i]=somme+" DT on 15";
                     }else{
                     this.infoMessages.push(somme+" DT on 15");
                     }
                         this.Somme_Bet[15]=somme;
    }
  }
  fct_16(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=16;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("16/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
    this.TotallBet=Number(x);
    let y= parseFloat(this.yourCash.toString()).toFixed(2);
    this.yourCash=Number(y);
     //jeton
 var td_1 = document.getElementById('td_16');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="16"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[16]+" DT on 16")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[16]+" DT on 16");
                          this.infoMessages[i]=somme+" DT on 16";
                     }else{
                     this.infoMessages.push(somme+" DT on 16");
                     }
                         this.Somme_Bet[16]=somme;
    }
  }
  fct_17(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=17;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("17/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_17');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="17"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[17]+" DT on 17")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[17]+" DT on 17");
                          this.infoMessages[i]=somme+" DT on 17";
                     }else{
                     this.infoMessages.push(somme+" DT on 17");
                     }
                         this.Somme_Bet[17]=somme;
    }
  }
  fct_18(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber=18;
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber.toString());
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("18/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_18');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="18"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[18]+" DT on 18")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[18]+" DT on 18");
                          this.infoMessages[i]=somme+" DT on 18";
                     }else{
                     this.infoMessages.push(somme+" DT on 18");
                     }
                         this.Somme_Bet[18]=somme;
    }
  }
  fct_triple(){
    if((this.yourCash-this.selectedValue)<0){
      alert("NO MONEY LEFT FOR THIS OPERATION !");
    }
    else{
    let chosinNumber="TRIPLE";
    this.Messages.push(this.selectedValue.toString()+" DT on "+chosinNumber);
    this.yourCash=this.yourCash-Number(this.selectedValue);
    this.Valeurs.push("TRIPLE/"+this.selectedValue.toString());
    this.TotallBet=this.TotallBet+Number(this.selectedValue);
    let x= parseFloat(this.TotallBet.toString()).toFixed(2);
   this.TotallBet=Number(x);
   let y= parseFloat(this.yourCash.toString()).toFixed(2);
   this.yourCash=Number(y);
    //jeton
 var td_1 = document.getElementById('td_19');
 td_1.style.backgroundSize ="40px 40px";
 td_1.style.backgroundRepeat="no-repeat";
 
 

 let somme=0;
 this.Valeurs.forEach(ele=>{
  let x;
  
       x= ele.split("/");
       if(x[0]==="TRIPLE"){
            somme=somme+Number(x[1]);
       }
 });
 

 if(somme<0.4){
  td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
     }
     if((0.4<=somme)&&(somme<1)){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
         }
         if((1<=somme)&&(somme<2)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
             }
             if((2<=somme)&&(somme<5)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                 }
                 if((5<=somme)&&(somme<10)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                     }
 
                     if((10<=somme)&&(somme<50)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                         }
                         if(somme>=50){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                         }
                         let z= parseFloat(somme.toString()).toFixed(2);
                         somme=Number(z);
                         if(this.infoMessages.includes(this.Somme_Bet[19]+" DT on TRIPLE")){
                          let i =this.infoMessages.indexOf(this.Somme_Bet[19]+" DT on TRIPLE");
                          this.infoMessages[i]=somme+" DT on TRIPLE";
                     }else{
                     this.infoMessages.push(somme+" DT on TRIPLE");
                     }
                         this.Somme_Bet[19]=somme;
    }
  }
  /********************************DICEEEEEE************************************************************ */
  randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  /***************************************************** */
  removeBet(i:number){
   let done=false;
let x =this.infoMessages.splice(i,1)
var element = x[0].split(" DT on ");
this.yourCash=this.yourCash+Number(element[0]);
let z=parseFloat(this.yourCash.toString()).toFixed(2);
this.yourCash=Number(z);
this.TotallBet=this.TotallBet-Number(element[0]);
let a=parseFloat(this.TotallBet.toString()).toFixed(2);
this.TotallBet=Number(a);
if(element[1]==="LOW"){
  let id=document.getElementById('td_0');
  id.style.backgroundImage = '';
  this.Somme_Bet[0]=null;
  done=true;
  let indexs:number[]=[];
  this.Valeurs.forEach((ele,index)=>{
    let x = ele.split("/");
    if(x[0]==="LOW"){
        indexs.push(index);
    }
  });
  let o =0;
  for(let z of indexs){
    
    
    if(o>0){
      this.Valeurs.splice(z-o,1);
    }
    else{
      this.Valeurs.splice(z,1);
    }
    o++;
  }
  
}
if(element[1]==="HIGH"){
  let id=document.getElementById('td_9');
  id.style.backgroundImage = '';
  this.Somme_Bet[9]=null;
  done=true;
  let indexs:number[]=[];
  this.Valeurs.forEach((ele,index)=>{
    let x = ele.split("/");
    if(x[0]==="HIGH"){
        indexs.push(index);
    }
  });
  let o =0;
  for(let z of indexs){
    
    
    if(o>0){
      this.Valeurs.splice(z-o,1);
    }
    else{
      this.Valeurs.splice(z,1);
    }
    o++;
  }
}
if(element[1]==="DOUBLE"){
  let id=document.getElementById('td_10');
  id.style.backgroundImage = '';
  this.Somme_Bet[10]=null;
  done=true;
  let indexs:number[]=[];
  this.Valeurs.forEach((ele,index)=>{
    let x = ele.split("/");
    if(x[0]==="DOUBLE"){
        indexs.push(index);
    }
  });
  let o =0;
  for(let z of indexs){
    
    
    if(o>0){
      this.Valeurs.splice(z-o,1);
    }
    else{
      this.Valeurs.splice(z,1);
    }
    o++;
  }
}
if(element[1]==="TRIPLE"){
  let id=document.getElementById('td_19');
  id.style.backgroundImage = '';
  this.Somme_Bet[19]=null;
  done=true;
  let indexs:number[]=[];
  this.Valeurs.forEach((ele,index)=>{
    let x = ele.split("/");
    if(x[0]==="TRIPLE"){
        indexs.push(index);
    }
  });
  let o =0;
  for(let z of indexs){
    
    
    if(o>0){
      this.Valeurs.splice(z-o,1);
    }
    else{
      this.Valeurs.splice(z,1);
    }
    o++;
  }
}
if(!done){
  for(let i=3;i<=18;i++){
if(Number(element[1])===i){
  if(i<=10){
    let id=document.getElementById('td_'+(i-2));
    id.style.backgroundImage = '';
    this.Somme_Bet[i-2]=null;
    
  }
  else{
    let id=document.getElementById('td_'+i);
    id.style.backgroundImage = '';
    this.Somme_Bet[i]=null;
  }
  let indexs:number[]=[];
  this.Valeurs.forEach((ele,index)=>{
    let x = ele.split("/");
    if(x[0]===element[1]){
        indexs.push(index);
    }
  });
  let o =0;
  for(let z of indexs){
    
    
    if(o>0){
      this.Valeurs.splice(z-o,1);
    }
    else{
      this.Valeurs.splice(z,1);
    }
    o++;
  }
}
  }
}
  }
  Undo(){
    this.disablebutton=false;
    this.yourCash=this.yourCash+this.TotallBet
    let a=parseFloat(this.yourCash.toString()).toFixed(2);
this.yourCash=Number(a);
this.TotallBet=0;
    this.Messages=[];
    this.Valeurs=[];
    for (let i = 0; i <= 19; i++){
      var id=document.getElementById('td_'+i);
      id.style.backgroundImage = '';
    }
    this.Somme_Bet=[];
    this.infoMessages=[];
  }
  //valeurs
  //infoMessage
  
previousBet(){
  let somme=0;
  this.HistoryBet.forEach(ele=>{
    let element=ele.split(" DT on ");
  somme=somme+Number(element[0]);
  });
if(this.yourCash<somme){
  alert("NO MONEY LEFT FOR THIS OPERATION !");
}else{
  this.disablebutton=true;
  this.yourCash=this.yourCash-somme;
  let a=parseFloat(this.yourCash.toString()).toFixed(2);
this.yourCash=Number(a);
  this.TotallBet=this.TotallBet+somme;
  let b=parseFloat(this.TotallBet.toString()).toFixed(2);
  this.TotallBet=Number(b);
  this.HistoryBet.forEach(ele=>{
   
    let verifiedLetter=false;
    let element=ele.split(" DT on ");
  if(element[1]==="LOW"){
    this.Valeurs.push("LOW/"+element[0]);
    this.Somme_Bet[0]=Number(element[0]);
    var td_1 = document.getElementById('td_0');
    if(this.Somme_Bet[0]<0.4){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
         }
         if((0.4<=this.Somme_Bet[0])&&(this.Somme_Bet[0]<1)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
             }
             if((1<=this.Somme_Bet[0])&&(this.Somme_Bet[0]<2)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                 }
                 if((2<=this.Somme_Bet[0])&&(this.Somme_Bet[0]<5)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                     }
                     if((5<=this.Somme_Bet[0])&&(this.Somme_Bet[0]<10)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                         }
     
                         if((10<=this.Somme_Bet[0])&&(this.Somme_Bet[0]<50)){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                             }
                             if(this.Somme_Bet[0]>=50){
                              td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                             }
                             verifiedLetter=true;
  }
  if(element[1]==="HIGH"){
    this.Valeurs.push("HIGH/"+element[0]);
    this.Somme_Bet[9]=Number(element[0]);
    var td_1 = document.getElementById('td_9');
    if(this.Somme_Bet[9]<0.4){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
         }
         if((0.4<=this.Somme_Bet[9])&&(this.Somme_Bet[9]<1)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
             }
             if((1<=this.Somme_Bet[9])&&(this.Somme_Bet[9]<2)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                 }
                 if((2<=this.Somme_Bet[9])&&(this.Somme_Bet[9]<5)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                     }
                     if((5<=this.Somme_Bet[9])&&(this.Somme_Bet[9]<10)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                         }
     
                         if((10<=this.Somme_Bet[9])&&(this.Somme_Bet[9]<50)){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                             }
                             if(this.Somme_Bet[9]>=50){
                              td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                             }
                             verifiedLetter=true;
  }
  if(element[1]==="DOUBLE"){
    this.Valeurs.push("DOUBLE/"+element[0]);
    this.Somme_Bet[10]=Number(element[0]);
    var td_1 = document.getElementById('td_10');
    if(this.Somme_Bet[10]<0.4){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
         }
         if((0.4<=this.Somme_Bet[10])&&(this.Somme_Bet[10]<1)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
             }
             if((1<=this.Somme_Bet[10])&&(this.Somme_Bet[10]<2)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                 }
                 if((2<=this.Somme_Bet[10])&&(this.Somme_Bet[10]<5)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                     }
                     if((5<=this.Somme_Bet[10])&&(this.Somme_Bet[10]<10)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                         }
     
                         if((10<=this.Somme_Bet[10])&&(this.Somme_Bet[10]<50)){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                             }
                             if(this.Somme_Bet[10]>=50){
                              td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                             }
                             verifiedLetter=true;
  }
  if(element[1]==="TRIPLE"){
    this.Valeurs.push("TRIPLE/"+element[0]);
    this.Somme_Bet[19]=Number(element[0]);
    var td_1 = document.getElementById('td_19');
    if(this.Somme_Bet[19]<0.4){
      td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
         }
         if((0.4<=this.Somme_Bet[19])&&(this.Somme_Bet[19]<1)){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
             }
             if((1<=this.Somme_Bet[19])&&(this.Somme_Bet[19]<2)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                 }
                 if((2<=this.Somme_Bet[19])&&(this.Somme_Bet[19]<5)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                     }
                     if((5<=this.Somme_Bet[19])&&(this.Somme_Bet[19]<10)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                         }
     
                         if((10<=this.Somme_Bet[19])&&(this.Somme_Bet[19]<50)){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                             }
                             if(this.Somme_Bet[19]>=50){
                              td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                             }
                             verifiedLetter=true;
  }
  if(!verifiedLetter){
    for(let i=3;i<=18;i++){
      if((Number(element[1])===i)&&i<=10){
        this.Somme_Bet[i-2]=Number(element[0]);
        var td_1 = document.getElementById('td_'+(i-2));
        if(this.Somme_Bet[i-2]<0.4){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
             }
             if((0.4<=this.Somme_Bet[i-2])&&(this.Somme_Bet[i-2]<1)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                 }
                 if((1<=this.Somme_Bet[i-2])&&(this.Somme_Bet[i-2]<2)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                     }
                     if((2<=this.Somme_Bet[i-2])&&(this.Somme_Bet[i-2]<5)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                         }
                         if((5<=this.Somme_Bet[i-2])&&(this.Somme_Bet[i-2]<10)){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                             }
         
                             if((10<=this.Somme_Bet[i-2])&&(this.Somme_Bet[i-2]<50)){
                              td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                 }
                                 if(this.Somme_Bet[i-2]>=50){
                                  td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                 }
                                 this.Valeurs.push(i+"/"+element[0]);
      }
      if((Number(element[1])===i)&&i>10){
        this.Somme_Bet[i]=Number(element[0]);
        var td_1 = document.getElementById('td_'+i);
        if(this.Somme_Bet[i]<0.4){
          td_1.style.backgroundImage="url('"+this.IMG_PATH[0]+"')";
             }
             if((0.4<=this.Somme_Bet[i])&&(this.Somme_Bet[i]<1)){
              td_1.style.backgroundImage="url('"+this.IMG_PATH[1]+"')";
                 }
                 if((1<=this.Somme_Bet[i])&&(this.Somme_Bet[i]<2)){
                  td_1.style.backgroundImage="url('"+this.IMG_PATH[2]+"')";
                     }
                     if((2<=this.Somme_Bet[i])&&(this.Somme_Bet[i]<5)){
                      td_1.style.backgroundImage="url('"+this.IMG_PATH[3]+"')";
                         }
                         if((5<=this.Somme_Bet[i])&&(this.Somme_Bet[i]<10)){
                          td_1.style.backgroundImage="url('"+this.IMG_PATH[4]+"')";
                             }
         
                             if((10<=this.Somme_Bet[i])&&(this.Somme_Bet[i]<50)){
                              td_1.style.backgroundImage="url('"+this.IMG_PATH[5]+"')";
                                 }
                                 if(this.Somme_Bet[i]>=50){
                                  td_1.style.backgroundImage="url('"+this.IMG_PATH[6]+"')";
                                 }
                                 this.Valeurs.push(i+"/"+element[0]);
      }
    }
  }
  });

}
}
  /**************************TIMER************************************** */



  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 25;
       this.DICE1 = this.randomIntFromInterval(1, 6);
        this.DICE2 = this.randomIntFromInterval(1, 6);
        this.DICE3 = this.randomIntFromInterval(1, 6);
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  
}
