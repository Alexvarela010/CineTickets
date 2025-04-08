import {Component, OnInit} from '@angular/core';
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Pelicula} from '../../../../core/models/pelicula';
import {Router} from '@angular/router';
import {PeliculaService} from '../../../../core/services/PeliculaService/pelicula.service';
import Swal from 'sweetalert2';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';


@Component({
  selector: 'app-peliculas-list',
  imports: [
    InputText,
    PrimeTemplate,
    TableModule,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
    InputNumber,
  ],
  templateUrl: './peliculas-list.component.html',
  styleUrl: './peliculas-list.component.css'
})
export class PeliculasListComponent implements OnInit {
  peliculas: Array<Pelicula> = [];
  visible: boolean = false;
  peliculaForm!: FormGroup;

  constructor(private peliculaservice: PeliculaService, private router: Router,private fb:FormBuilder) {
  }

  goToPeliculasform(peliculaid: number) {
    this.router.navigate(['Admin/peliculas', 'editar', peliculaid]);
  }

  goToPeliculasformcrear() {
    this.router.navigate(['Admin/peliculas', 'crear']);
  }

  eliminarpelicula(pelicula: Pelicula) {
    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar " + pelicula.titulo + "?",
      text: "Esta acción no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar la pelicula!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.peliculaservice.deletePeliculas(pelicula.peliculaId).subscribe(() => {
          Swal.fire({
            title: "Eliminado!",
            text: "La pelicula ha sido eliminada.",
            icon: "success"
          });
          this.getpeliculas();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getpeliculas()
    this.peliculaForm = this.fb.group({
      peliculaId: [],
      titulo: [''],
      descripcion: [''],
      categoria: [''],
      duracion: [''],
      estado: [''],
      imagen: [''],
      imagenCarrusel: [''],
      precioEntrada: [''],
    });
  }

  onGlobalFilter(event: Event, table: any) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  getpeliculas() {
    this.peliculaservice.getpeliculas().subscribe(
      (peliculas: Array<Pelicula>) => {
        this.peliculas = peliculas;
        console.log(this.peliculas);
      }
    )
  }
  showDialog(peliculaid:number) {
    this.visible = true;
    this.peliculaservice.getpelicula_x_id(peliculaid).subscribe(
      pelicula=>{
        this.peliculaForm.patchValue({
          peliculaId:peliculaid,
          titulo:pelicula.titulo,
          descripcion:pelicula.descripcion,
          categoria:pelicula.categoria,
          duracion:pelicula.duracion,
          estado:pelicula.estado,
          imagen: pelicula.imagen,
          imagenCarrusel:pelicula.imagenCarrusel,
          precioEntrada:pelicula.precioEntrada
        })
      }
    );
  }
}
