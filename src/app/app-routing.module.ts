import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HomeComponent } from './home/home.component';
import { LightingDiceComponent } from './lighting-dice/lighting-dice.component';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';

const routes: Routes = [ {path:"",component:AuthentificationComponent,data:{title : 'Auth' }},
{path:"Home",component:HomeComponent,data:{title : 'Home' }},
{path:"WhoAreWe",component:WhoAreWeComponent,data:{title : 'Who Are We ?' }},
{path:"lighting-dice",component:LightingDiceComponent,data:{title : 'lighting-dice' }}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
