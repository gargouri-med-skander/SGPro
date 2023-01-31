import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';
import { LightingDiceComponent } from './lighting-dice/lighting-dice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpLightingDiceComponent } from './pop-up-lighting-dice/pop-up-lighting-dice.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthentificationComponent,
    NavBarComponent,
    WhoAreWeComponent,
    LightingDiceComponent,
    PopUpLightingDiceComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
