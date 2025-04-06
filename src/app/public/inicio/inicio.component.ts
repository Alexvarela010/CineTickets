import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {map, Observable, startWith} from 'rxjs';
import {Pelicula} from '../../core/models/pelicula';
import {InicioService} from '../../core/services/InicioService/inicio.service';
import {ref, uploadBytesResumable, getDownloadURL, Storage} from '@angular/fire/storage';
import {Pagos} from '../../core/models/pagos';
import {PeliculaService} from '../../core/services/PeliculaService/pelicula.service';

@Component({
  selector: 'app-inicio',
  imports: [
    AsyncPipe,
    FormsModule,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  standalone: true
})
export default class InicioComponent implements OnInit {
  peliculas: Array<Pelicula> = [];
  pagos: Array<Pagos> = [];

  constructor(private inicioService: InicioService, private peliculaservice:PeliculaService) {

  }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.getPeliculas();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getPeliculas() {
    this.peliculaservice.getpeliculas().subscribe(
      (peliculas: Array<Pelicula>) => {
        this.peliculas = peliculas;
        console.log(this.peliculas);
      }
    )
  }

  logout() {
    localStorage.removeItem('token');
  }

  getPagos() {
    console.log(2)
    this.inicioService.getpagos().subscribe(
      (pagos: Array<Pagos>) => {
        this.pagos = pagos;
        console.log(this.pagos);
      }
    )
  }

}

