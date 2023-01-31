import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import { TokenStorageService } from '../service/token-storage.service';
import { UserServiceService } from '../service/user-service.service';
const TOKEN_KEY='zb';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string;

  public imagePath :any;
   imgURL: any;
   userFile: any;
   message!: string; 




constructor(private authService:AuthserviceService,
  private tokenStorag:TokenStorageService,
  private router:Router,
  private userService:UserServiceService){}
  ngOnInit(): void {
    this.username=this.tokenStorag.getUsername();
   
   
  }

 //file
 onSelectFile(event:any) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.userFile = file;
   // this.f['profile'].setValue(file);

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  
  this.imagePath = file;
  reader.readAsDataURL(file); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}
}
ChangeAvatar(){
  this.userService.UploadFileMethod(this.userFile,this.tokenStorag.getID()).subscribe(data=>{
    console.log(data);
  })
}
}
