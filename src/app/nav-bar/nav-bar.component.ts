import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
constructor(private authService:AuthserviceService,
  
  private router:Router){}

  logOutFunction(){
    this.authService.logOut();
    this.router.navigate(['']);
    
  }
}
