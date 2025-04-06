import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {NgIf} from '@angular/common';
import {getDownloadURL, ref, Storage, uploadBytesResumable} from '@angular/fire/storage';
import {Pelicula} from '../../../../core/models/pelicula';
import {PeliculaService} from '../../../../core/services/PeliculaService/pelicula.service';
import Swal from 'sweetalert2';
import {InputNumber} from 'primeng/inputnumber';

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

  constructor(private fb: FormBuilder, private peliculaservice: PeliculaService) {
  }

  ngOnInit(): void {
    this.peliculaForm = this.fb.group({
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

  onSubmit(): void {
    if (this.peliculaForm.valid) {
      console.log(this.peliculaForm.value)
      this.peliculaservice.addPeliculas(this.peliculaForm.value).subscribe(
        (pelicula: Pelicula) => {
          Swal.fire(
            'Pelicula creada',
            `${pelicula.titulo} ha sido creada con exito`,
            'success'
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
      const filepath = `peliculas/tarjetas${this.imgtarjeta.name}`;
      const filepath1 = `peliculas/carrusel${this.imgCarrusel.name}`;
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
