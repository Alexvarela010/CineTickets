import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Pelicula} from './inicio/pelicula';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private baseUrl: string="http://localhost:8080/CineTickets-Service";

  constructor(private httpClient:HttpClient) { }

getpeliculas():Observable<Pelicula[]>{
    return this.httpClient.get<{peliculas:Pelicula[]}>(this.baseUrl+"/peliculas")
      .pipe(map((response:any)=>{
        return response;
      }))
}
}

