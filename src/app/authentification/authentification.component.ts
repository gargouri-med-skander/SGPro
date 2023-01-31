import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { SigninRequest } from '../Models/SigninRequest';
import { SignupRequest } from '../Models/SignupRequest';
import { AuthserviceService } from '../service/authservice.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent {

  constructor(private authService:AuthserviceService
    ,private router : Router){}
  errorMessage="";
  signupReq=new SignupRequest();
  SigninReq=new SigninRequest();
  
   about="";
   selectedValue:string='NO Answer';
   saveuser(reqSaved:SignupRequest){
     this.signupReq=reqSaved;
     
     /*const formData = new  FormData();
     
 
     formData.append('reqSaved',JSON.stringify(reqSaved));
     formData.append('file',this.userFile);*/
    
    
     this.authService.signUpMethod( this.signupReq).subscribe( data => {
      let todayString : string = new Date().toDateString();
       let intro="-username = "+this.signupReq.username+" ||||"+" -wanna join us ? = "+this.selectedValue+" |||| -Register time = "+todayString+" |||| -About Member = "+this.about;
       console.log(intro);
   
      
       this.authService.SendEmailMethod(intro,  this.signupReq.email).subscribe(data1=>{
 
       });
       alert("User registered successfully!");
       this.router.navigate(['']);
      
 
     },error=>{
       this.errorMessage=error.error.message;
       alert(this.errorMessage);
      
     }
     );
   }
   
   
   
  
 SignInUser(signInReq:SigninRequest){
   this.authService.signInMethod(signInReq)
   .pipe(first()).subscribe(
     data =>{
      console.log(data);
     //  this.authService.hearder(data).subscribe();
       this.router.navigate(['Home']);
 
     },error =>{
       
   
       this.router.navigate(['Home']);
     }
   )
     
 }
 goToLink(){
  alert("Ta7et yasmina fi lil");
  window.open("https://www.youtube.com/watch?v=vq8ve-5Gu3A", "_blank");
  
 }
}
