import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@angular/fire/storage';
import {AuthRequest} from '../../models/AuthRequest';
import {map, Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {enviroment} from '../../../../enviroments/enviroment';
import {UsuariosService} from '../UserService/usuarios.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string = enviroment.apiUrl;

  constructor(private httpClient: HttpClient, private userService:UsuariosService,private router:Router) {
  }

  getToken(auth:AuthRequest):Observable<string>{
    return this.httpClient.post(this.baseUrl+"/generateToken",auth,{
    responseType:'text'
    }).pipe(
      map(token=>{
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.sub===enviroment.admin){
            localStorage.setItem('rol','admin');
            console.log(localStorage)
            this.router.navigate(['Admin/peliculas'])
        }else{
            this.userService.getIDUsuarios(decodedToken.sub)
            localStorage.setItem('rol','user');
          this.router.navigate(['inicio'])
        }
        localStorage.setItem('token',token);
        localStorage.setItem('user',decodedToken.sub);
        localStorage.setItem('logged','true');
        return token;

      })
    );
  }

}
