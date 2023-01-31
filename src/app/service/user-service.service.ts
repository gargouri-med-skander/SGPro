import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private avatarUploadUrl='http://localhost:8089/user/avatar/';
  constructor(private http:HttpClient,private tokenStorage:TokenStorageService) { }

  UploadFileMethod(file:File,id:string){
    let tokenStr='Bearer '+this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post(this.avatarUploadUrl+id,file,{headers, responseType: 'text' as 'json' });
  }
}
