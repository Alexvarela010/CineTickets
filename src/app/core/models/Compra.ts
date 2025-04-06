import { UserInfo } from './UserInfo';
import { Pelicula } from './pelicula';

export class Compra {
  compraId!: number;
  userInfo!: UserInfo;
  pelicula!: Pelicula;
  precioTotal!: number;
  cantidadTickets!: number;
  fechaCompra!: string;
}
