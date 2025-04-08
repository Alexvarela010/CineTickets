import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {NgIf} from '@angular/common';
import {getDownloadURL, ref, Storage, uploadBytesResumable} from '@angular/fire/storage';
import {Pelicula} from '../../../../core/models/pelicula';
import {PeliculaService} from '../../../../core/services/PeliculaService/pelicula.service';
import Swal from 'sweetalert2';
import {InputNumber} from 'primeng/inputnumber';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-peliculas-form',
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    NgIf,
    InputNumber,
  ],
  templateUrl: './peliculas-form.component.html',
  styleUrl: './peliculas-form.component.css'
})
export class PeliculasFormComponent {
  peliculaForm!: FormGroup;
  private storage = inject(Storage);
  imgtarjeta!: File;
  imgCarrusel!: File;
  archivo: any
  archivoCarrusel: any
  previewUrl: string | ArrayBuffer | null = null;
  previewUrl1: string | ArrayBuffer | null = null;
  crearOrEditar = 'Crear';
  peliculaId!: number;
  constructor(private fb: FormBuilder, private peliculaservice: PeliculaService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const modo = params['modo'];
      this.crearOrEditar = modo === 'editar' ? 'Editar' : 'Crear';
      if (modo === 'editar') {
        this.peliculaId = +params['id'];
        this.cargarpelicula()
      }
    });
    this.peliculaForm = this.fb.group({
      peliculaId: [],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      estado: ['', [Validators.required, Validators.min(1)]],
      imagen: [''],
      imagenCarrusel: [''],
      precioEntrada: ['', [Validators.required, Validators.min(1)]],
    });
  }
  cargarpelicula(){
    this.peliculaservice.getpelicula_x_id(this.peliculaId).subscribe(
      pelicula=>{
        this.peliculaForm.patchValue({
          peliculaId:this.peliculaId,
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

  onSubmit(): void {
    console.log(this.crearOrEditar)
    if (this.peliculaForm.valid && this.crearOrEditar==='Crear') {
      this.peliculaservice.addPeliculas(this.peliculaForm.value).subscribe(
        (pelicula: Pelicula) => {
          Swal.fire(
            'Pelicula creada',
            `${pelicula.titulo} ha sido creada con exito`,
            'success'
          ).then(result =>{
            if (result.isConfirmed) {
              window.history.back();
            }
          })
        }
      )
    }else if(this.peliculaForm.valid){
      console.log(this.peliculaForm.value, "edit")
      this.peliculaservice.editPeliculas(this.peliculaForm.value).subscribe(
        (pelicula: Pelicula) => {
          Swal.fire(
            'Pelicula editada',
            `${pelicula.titulo} ha sido editada con exito`,
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


  onFileSelected(event: any) {
    this.archivo = event.target as HTMLInputElement;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onFileSelected1(event: any) {
    this.archivoCarrusel = event.target as HTMLInputElement;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl1 = reader.result;
    };

    reader.readAsDataURL(file);
  }

  uploadFile() {
    if (this.archivo.files && this.archivoCarrusel.files) {
      this.imgtarjeta = this.archivo.files[0]
      this.imgCarrusel = this.archivoCarrusel.files[0]
      const filepath = `peliculas${this.imgtarjeta.name}`;
      const filepath1 = `peliculas${this.imgCarrusel.name}`;
      const fileRef = ref(this.storage, filepath)
      const fileRef1 = ref(this.storage, filepath1)
      const uploadfile = uploadBytesResumable(fileRef, this.imgtarjeta)
      const uploadfile1 = uploadBytesResumable(fileRef1, this.imgCarrusel)
      uploadfile.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error: any) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(fileRef);
          this.peliculaForm.patchValue({imagen: downloadURL});
          const downloadURL1 = await getDownloadURL(fileRef1);
          this.peliculaForm.patchValue({imagenCarrusel: downloadURL1});
          console.log("se subio", downloadURL);
          this.onSubmit()
        })
    } else {
      console.log("no hay archivo");
    }

  }

}
