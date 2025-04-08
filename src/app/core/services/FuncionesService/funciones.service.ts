import {inject, Injectable} from '@angular/core';
import {enviroment} from '../../../../enviroments/enviroment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@angular/fire/storage';
import {map, Observable} from 'rxjs';
import {Funcion} from '../../models/Funcion';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  private baseUrl: string = enviroment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  private storage = inject(Storage);

  getfunciones(): Observable<Funcion[]> {
    return this.httpClient.get<{ funciones: Funcion[] }>(this.baseUrl + "/funciones")
      .pipe(map((response: any) => {
        return response;
      }))
  }

  getfuncion_x_id(funcionId: number): Observable<Funcion> {
    return this.httpClient.get<Funcion>(this.baseUrl + '/funciones/' + funcionId);
  }

  addFuncion(funcion: Funcion): Observable<Funcion> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.post<Funcion>(this.baseUrl + "/funciones", funcion, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }

  editFuncion(funcion: Funcion): Observable<Funcion> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.put<Funcion>(this.baseUrl + "/funciones", funcion, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }

  deleteFuncion(funcionId: number): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.delete(this.baseUrl + "/funciones/" + funcionId, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }
}
