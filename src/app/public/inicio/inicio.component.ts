import {Component, inject, Inject, input, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {map, Observable, startWith} from 'rxjs';
import {Pelicula} from './pelicula';
import {InicioService} from '../inicio.service';
import {ref, FirebaseStorage, uploadBytesResumable, getDownloadURL, Storage} from '@angular/fire/storage';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {MatCard, MatCardContent, MatCardFooter, MatCardImage} from '@angular/material/card';

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
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardFooter
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  standalone:true
})
export default class InicioComponent implements OnInit {
  peliculas: Array<Pelicula> = [];
  private storage = inject(Storage);
  constructor(private inicioService: InicioService) {

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
    this.inicioService.getpeliculas().subscribe(
      (peliculas: Array<Pelicula>) => {
        this.peliculas = peliculas;
        console.log(this.peliculas);
      }
    )
  }

  file!:File;
  UploadProgress$!: Observable<number>
  downloadURL$!: Observable<string>
  onFileSelected(event: any) {
    const archivo=event.target as HTMLInputElement;
    if (archivo.files) {
      this.file=archivo.files[0]
      this.uploadFile(this.file)
    }
      }
   uploadFile(file:File){
    const filepath=`peliculas/${file.name}`;
    const fileRef = ref(this.storage,filepath)
    const uploadfile=uploadBytesResumable(fileRef,file)
    uploadfile.on('state_changed',
      (snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      },
      (error:any)=>{
        console.log(error);
      },
      async ()=>{
        const downloadURL=await getDownloadURL(fileRef);
        console.log("se subio",downloadURL);
      })

  }
}

