import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInfo} from '../../models/UserInfo';
import {map, Observable} from 'rxjs';
import {enviroment} from '../../../../enviroments/enviroment';
import {Storage} from '@angular/fire/storage';
import {Pelicula} from '../../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = enviroment.apiUrl;
  private storage = inject(Storage);
  constructor(private httpClient: HttpClient) {}


  getUsuarios(): Observable<UserInfo[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<{ usuario: UserInfo[] }>(this.baseUrl + "/usuarios", {headers})
        .pipe(map((response: any) => {
          return response;
        }))
    } else {
      throw new Error("Token no encontrado");
    }
  }
  getIDUsuarios(email:string) {
       this.httpClient.get<number>(this.baseUrl + "/usuarios/id/"+email).subscribe(
         (id:number)=>{
            localStorage.setItem("id",id.toString());
         }
       )
  }
  crearUsuario(usuario: UserInfo): Observable<string> {
    return this.httpClient.post(this.baseUrl+"/addNewUser", usuario,{responseType:"text"});
  }

  getUsuario_x_id(idusuario: number): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>(this.baseUrl + '/usuarios/' + idusuario);
  }

  editUsuario(usuario: UserInfo): Observable<UserInfo> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.put<UserInfo>(this.baseUrl + "/usuarios", usuario, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }


}
