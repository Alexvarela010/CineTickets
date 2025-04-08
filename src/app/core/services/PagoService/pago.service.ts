import {inject, Injectable} from '@angular/core';
import {enviroment} from '../../../../enviroments/enviroment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Pelicula} from '../../models/pelicula';
import {Storage} from '@angular/fire/storage';
import {Pagos} from '../../models/pagos';
import {Detallecompra} from '../../models/Detallecompra';
import {Compra} from '../../models/Compra';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private baseUrl: string = enviroment.apiUrl;

  constructor(private httpClient:HttpClient) { }
  getpagos(): Observable<Pagos[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get<{ pagos: Pagos[] }>(this.baseUrl + "/pagos", {headers})
        .pipe(map((response: any) => {
          return response;
        }))
    }else{
      throw new Error("Token no encontrado");
    }
  }

  getpago_x_id(idpago: number): Observable<Pagos> {
    return this.httpClient.get<Pagos>(this.baseUrl + '/pagos/' + idpago);
  }
  addPago( pago:Pagos): Observable<Pagos> {
      return this.httpClient.post<Pagos>(this.baseUrl + "/pagos", pago, )
  }

}
