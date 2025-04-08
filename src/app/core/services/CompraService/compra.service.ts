import {inject, Injectable} from '@angular/core';
import {enviroment} from '../../../../enviroments/enviroment';
import {Storage} from '@angular/fire/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Pagos} from '../../models/pagos';
import {Compra} from '../../models/Compra';
import {Pelicula} from '../../models/pelicula';
import {Detallecompra} from '../../models/Detallecompra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private baseUrl: string = enviroment.apiUrl;
  private storage = inject(Storage);

  constructor(private httpClient:HttpClient) { }
  getcompras(): Observable<Compra[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<{ compras: Compra[] }>(this.baseUrl + "/compras", {headers})
        .pipe(map((response: any) => {
          return response;
        }))
    }else{
      throw new Error("Token no encontrado");
    }
  }
  addCompras(compra: Compra, ): Observable<Compra> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.post<Compra>(this.baseUrl + "/compras", compra, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }
  adddetalleCompras( detalle:Detallecompra): Observable<Detallecompra> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.post<Detallecompra>(this.baseUrl + "/detallecompras", detalle, {headers})
    } else {
      throw new Error("Token no encontrado");
    }
  }

getcompra_x_id(idcompra: number): Observable<Compra> {
    return this.httpClient.get<Compra>(this.baseUrl + '/compras/' + idcompra);
  }
}
