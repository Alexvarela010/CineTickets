import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Pelicula} from '../../models/pelicula';
import {Pagos} from '../../models/pagos';
import {Storage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private baseUrl: string = "http://localhost:8080/CineTickets-Service";

  constructor(private httpClient: HttpClient) {
  }

  private storage = inject(Storage);

  getpagos(): Observable<Pagos[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<{ pagos: Pagos[] }>(this.baseUrl + "/pagos", {headers})
        .pipe(map((response: any) => {
          return response;
        }))
    } else {
      throw new Error("Token no encontrado");
    }
  }
}

