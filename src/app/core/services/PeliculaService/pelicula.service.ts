import {inject, Injectable} from '@angular/core';
import {Storage} from '@angular/fire/storage';
import {map, Observable} from 'rxjs';
import {Pelicula} from '../../models/pelicula';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Pagos} from '../../models/pagos';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private baseUrl: string = "http://localhost:8080/CineTickets-Service";

  constructor(private httpClient: HttpClient) { }
  private storage = inject(Storage);

  getpeliculas(): Observable<Pelicula[]> {
    return this.httpClient.get<{ peliculas: Pelicula[] }>(this.baseUrl + "/peliculas")
      .pipe(map((response: any) => {
        return response;
      }))
  }
  addPeliculas(pelicula:Pelicula): Observable<Pelicula> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.post<Pelicula>(this.baseUrl+"/peliculas",pelicula, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }
  editPeliculas(pelicula:Pelicula): Observable<Pelicula> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.put<Pelicula>(this.baseUrl+"/peliculas",pelicula, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }
  deletePeliculas(idpelicula:number): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.delete(this.baseUrl+"/peliculas/"+idpelicula, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }
}
