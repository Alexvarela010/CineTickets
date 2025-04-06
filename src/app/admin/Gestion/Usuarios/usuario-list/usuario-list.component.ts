import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Pelicula} from '../../../../core/models/pelicula';
import {InicioService} from '../../../../core/services/InicioService/inicio.service';
import { InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {PeliculaService} from '../../../../core/services/PeliculaService/pelicula.service';


@Component({
  selector: 'app-usuario-list',
  imports: [
    TableModule,
    InputTextModule,
    CommonModule
  ],
  standalone:true,
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit{
  peliculas: Array<Pelicula> = [];

  constructor(private peliculaservice:PeliculaService) {
  }

  ngOnInit(): void {
    this.peliculaservice.getpeliculas().subscribe(
      (peliculas: Array<Pelicula>) => {
        this.peliculas = peliculas;
        console.log(this.peliculas);
      }
    )  }
  onGlobalFilter(event: Event, table: any) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

goToCrearUsuario(){

}
  protected readonly HTMLInputElement = HTMLInputElement;
}
