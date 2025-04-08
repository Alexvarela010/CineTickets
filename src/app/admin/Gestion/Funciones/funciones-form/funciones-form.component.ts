import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputNumber} from "primeng/inputnumber";
import {formatDate, NgIf} from "@angular/common";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from '@angular/fire/storage';
import {PeliculaService} from '../../../../core/services/PeliculaService/pelicula.service';
import {ActivatedRoute} from '@angular/router';
import {Pelicula} from '../../../../core/models/pelicula';
import Swal from 'sweetalert2';
import {FuncionesService} from '../../../../core/services/FuncionesService/funciones.service';
import {Funcion} from '../../../../core/models/Funcion';
import {MultiSelect} from 'primeng/multiselect';

import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from '@angular/material/timepicker';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-funciones-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MultiSelect,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInput,
    MatSuffix,
    MatTimepicker,
    MatTimepickerToggle,
    MatTimepickerInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,

  ],
  templateUrl: './funciones-form.component.html',
  styleUrl: './funciones-form.component.css'
})

export class FuncionesFormComponent implements OnInit {
  funcionForm!: FormGroup;
  peliculas!: Array<Pelicula>;
  formGroup!: FormGroup;
  private storage = inject(Storage);
  crearOrEditar = 'Crear';
  funcionid!: number;

  constructor(private peliculaservice: PeliculaService, private fb: FormBuilder, private funcionservice: FuncionesService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getpeliculas()
    this.formGroup = new FormGroup({
      selectedPeliculas: new FormControl<Pelicula[] | null>([]),
    });

    this.route.params.subscribe(params => {
      const modo = params['modo'];
      this.crearOrEditar = modo === 'editar' ? 'Editar' : 'Crear';
      if (modo === 'editar') {
        this.funcionid = +params['id'];
        this.cargarfuncion()
      }
    });
    this.funcionForm = this.fb.group({
      fecha: [ Validators.required],
      hora: [ Validators.required],
      sala: ['', Validators.required],
      disponibilidad: ['', [Validators.required, Validators.min(1)]],
      pelicula: []
    });
  }

  getpeliculas() {
    this.peliculaservice.getpeliculas().subscribe(
      (peliculas: Array<Pelicula>) => {
        this.peliculas = peliculas;
      }
    )
  }

  cargarfuncion() {
    this.funcionservice.getfuncion_x_id(this.funcionid).subscribe(
      funcion => {
        this.funcionForm.patchValue({
          id: this.funcionid,
          pelicula: funcion.pelicula,
          fecha: funcion.fecha,
          hora: funcion.hora,
          sala: funcion.sala,
          disponibilidad: funcion.disponibilidad,
        })
      }
    );

  }

  onSubmit(): void {
    let peliculasSeleccionadas: Array<Pelicula> = [];
    peliculasSeleccionadas = this.formGroup.get('selectedPeliculas')?.value;
    const fechaDate: Date = this.funcionForm.get('fecha')?.value;
    let horaDate: any = this.funcionForm.get('hora')?.value;7
    if (typeof horaDate === 'string') {
      horaDate = new Date(`1970-01-01T${horaDate}`);
    }
    const fechaFormateada = formatDate(fechaDate, 'yyyy-MM-dd', 'en-US');
    const horaFormateada = formatDate(horaDate, 'HH:mm', 'en-US');
    this.funcionForm.patchValue({
      fecha: fechaFormateada,
      hora: horaFormateada
    })
    console.log(peliculasSeleccionadas.length)
    for (let i = 0; i < peliculasSeleccionadas.length; i++) {
      this.funcionForm.patchValue({
        pelicula: peliculasSeleccionadas[i],
      })
      if (this.funcionForm.valid && this.crearOrEditar === 'Crear') {
        this.funcionservice.addFuncion(this.funcionForm.value).subscribe(
          (funcion: Funcion) => {
            Swal.fire(
              'Funcion creada',
              `La funcion ha sido creada con exito`,
              'success'
            ).then((result)=>{
              if (result.isConfirmed){
                window.history.back();
              }
            })
          }
        )

      } else if (this.funcionForm.valid) {
        console.log(this.funcionForm.value, "edit")
        this.funcionservice.editFuncion(this.funcionForm.value).subscribe(
          (funcion: Funcion) => {
            Swal.fire(
              'Funcion editada',
              `La funcion ha sido editada con exito`,
              'success'
            ).then((result) => {
                if (result.isConfirmed) {
                  window.history.back();
                }
              }
            )
          }
        )
      }
    }
  }
}


