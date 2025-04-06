import {Component, OnInit} from '@angular/core';
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Pelicula} from '../../../../core/models/pelicula';
import {InicioService} from '../../../../core/services/InicioService/inicio.service';
import {RouterLink} from '@angular/router';
import {PeliculaService} from '../../../../core/services/PeliculaService/pelicula.service';

@Component({
  selector: 'app-peliculas-list',
  imports: [
    InputText,
    PrimeTemplate,
    TableModule,
    RouterLink
  ],
  templateUrl: './peliculas-list.component.html',
  styleUrl: './peliculas-list.component.css'
})
export class PeliculasListComponent implements OnInit{
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
}
