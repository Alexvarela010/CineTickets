import {Component, OnInit} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Funcion} from '../../../../core/models/Funcion';
import {FuncionesService} from '../../../../core/services/FuncionesService/funciones.service';

@Component({
  selector: 'app-funciones-list',
    imports: [
        Dialog,
        FormsModule,
        InputText,
        PrimeTemplate,
        ReactiveFormsModule,
        TableModule
    ],
  templateUrl: './funciones-list.component.html',
  styleUrl: './funciones-list.component.css'
})
export class FuncionesListComponent implements OnInit{
  funciones: Array<Funcion> = [];
  visible: boolean = false;
  funcionesform!: FormGroup;

  constructor(private funcionesService: FuncionesService, private router: Router,private fb:FormBuilder) {
  }

  goToFuncionesform(peliculaid: number) {
    this.router.navigate(['Admin/funciones', 'editar', peliculaid]);
  }

  goToFuncionesformcrear() {
    this.router.navigate(['Admin/funciones', 'crear']);
  }

  eliminarfuncion(funcion: Funcion) {
    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar?",
      text: "Esta acción no se podrá revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar la funcion!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionesService.deleteFuncion(funcion.id).subscribe(() => {
          Swal.fire({
            title: "Eliminado!",
            text: "La funcion ha sido eliminada.",
            icon: "success"
          });
          this.getfunciones();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getfunciones()
    this.funcionesform = this.fb.group({
      id: [],
      pelicula: [''],
      fecha: [''],
      hora: [''],
      sala: [''],
      disponibilidad: [''],
    });
  }

  onGlobalFilter(event: Event, table: any) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  getfunciones() {
    this.funcionesService.getfunciones().subscribe(
      (funciones: Array<Funcion>) => {
        this.funciones = funciones;
        console.log(this.funciones);
      }
    )
  }
  showDialog(funcionid:number) {
    this.visible = true;
    this.funcionesService.getfuncion_x_id(funcionid).subscribe(
      funcion=>{
        this.funcionesform.patchValue({
          id:funcion.id,
          disponibilidad:funcion.disponibilidad,
          pelicula:funcion.pelicula.titulo,
          fecha:funcion.fecha,
          hora:funcion.hora,
          sala:funcion.sala,
        })
      }
    );
  }
}
