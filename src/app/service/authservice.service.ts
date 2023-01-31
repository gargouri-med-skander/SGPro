import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SignupRequest } from '../Models/SignupRequest';
import { TokenStorageService } from './token-storage.service';
import { User } from '../Models/User';
import { jwtResponse } from '../Models/jwtResponse';
import { SigninRequest } from '../Models/SigninRequest';

const httpOption ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private currentUserSubject:BehaviorSubject<any>;
  public currentUser:Observable<User>;
  private SignupUrl = 'http://localhost:8089/auth/signup';
  private SigninUrl='http://localhost:8089/auth/signin';
  private SendEmailUrl='http://localhost:8089/auth/SendEmailRegister/';
  
 
  constructor(private http:HttpClient,private tokenStorage:TokenStorageService) {
    this.currentUserSubject=new BehaviorSubject<any>(sessionStorage.getItem('AuthToken'));
    this.currentUser=this.currentUserSubject.asObservable();
  }
/****************SEND-EMAIL************************** */
SendEmailMethod(about:string,Toemail:string){
 
  return this.http.post<any>(this.SendEmailUrl+Toemail,about,httpOption);
}
/******************SIGNUP-USER******************************** */
  signUpMethod(signupreq: SignupRequest){
    return this.http.post<any>(this.SignupUrl,signupreq,httpOption)
    .pipe(map (data =>{
      
      return data;}))}
/***********************SIGGNIN-USER************************************** */
signInMethod(loginInfo:SigninRequest){

  return this.http.post<jwtResponse>(this.SigninUrl,loginInfo, httpOption)
  .pipe(map(data =>{
    
    this.saveUserData(data);
   
    return data;
  }));
  
    }
hearder(data:jwtResponse){
let tokenStr='Bearer '+data.accessToken;
const headers = new HttpHeaders().set('Authorization', tokenStr);
return this.http.post("http://localhost:4200/",{headers, responseType: 'text' as 'json' });
}


/********************UPLOAD-FILE*************************** */
      uploadFile(file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
            reportProgress: true,
            responseType: 'text'
        });
      
        return this.http.request(req);
       }

       /*******SAVE-USER****************** */
       private saveUserData(data:jwtResponse){
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        this.tokenStorage.saveID(data.id);
        this.currentUserSubject.next(data.accessToken);
      }

      /**************LOG-OUT********************* */
      logOut(){
        sessionStorage.removeItem('AuthToken');
        sessionStorage.removeItem('AuthUsername');
        sessionStorage.removeItem('AuthAuthorities');
      }
}
