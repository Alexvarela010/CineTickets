import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {Pelicula} from '../../core/models/pelicula';
import {PeliculaService} from '../../core/services/PeliculaService/pelicula.service';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AutoComplete,
    RouterLink,

  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  standalone: true
})
export default class InicioComponent implements OnInit {
  peliculas: Array<Pelicula> = [];

  constructor(private peliculaservice: PeliculaService, private router:Router) {

  }

  items: any[] = [];

  value: any;

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.items = this.peliculas
      .filter(pelicula => pelicula.titulo.toLowerCase().includes(query))
      .map(pelicula => ({titulo: pelicula.titulo, id: pelicula.peliculaId}));
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

  onSelect(event: any) {
    const pelicula = event;
    this.router.navigate(['/peliculas-detail', pelicula.value.id]);
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




}

