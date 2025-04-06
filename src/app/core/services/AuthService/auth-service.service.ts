import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@angular/fire/storage';
import {AuthRequest} from '../../models/AuthRequest';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string = "http://localhost:8080/CineTickets-Service";

  constructor(private httpClient: HttpClient) {
  }

  getToken(auth:AuthRequest):Observable<string>{
    return this.httpClient.post(this.baseUrl+"/generateToken",auth,{
    responseType:'text'
    }).pipe(
      map(token=>{
        localStorage.setItem('token',token);
        return token;
      })
    );
  }
}
