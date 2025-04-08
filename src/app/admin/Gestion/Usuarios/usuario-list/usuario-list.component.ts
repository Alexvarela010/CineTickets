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
import {UserInfo} from '../../../../core/models/UserInfo';
import {UsuariosService} from '../../../../core/services/UserService/usuarios.service';


@Component({
  selector: 'app-peliculas-list',
  imports: [
    InputText,
    PrimeTemplate,
    TableModule,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  usuarios: Array<UserInfo> = [];
  usuariosinactivos: Array<UserInfo> = [];
  visible: boolean = false;
  visibleinactivo: boolean = false;
  usuarioForm!: FormGroup;

  constructor(private usuarioservice:UsuariosService, private router: Router,private fb:FormBuilder) {
  }

  eliminarUsuario(usuario: UserInfo) {
    usuario.estado='Inactivo';
    Swal.fire({
      title: "¿Estás seguro de que deseas eliminar " + usuario.name + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar al usuario!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioservice.editUsuario(usuario).subscribe(() => {
          this.getusuarios();
          Swal.fire({
            title: "Eliminado!",
            text: "El usuario ha sido eliminada.",
            icon: "success"
          });

        });
      }
    });
  }
  activarUsuario(usuario: UserInfo) {
    usuario.estado='Activo';
    Swal.fire({
      title: "¿Estás seguro de que deseas reactivar a " + usuario.name + "?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#018002",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, reactivar al usuario!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioservice.editUsuario(usuario).subscribe(() => {
          console.log(usuario)
          this.getusuarios();
          Swal.fire({
            title: "Reactivado!",
            text: "El usuario ha sido reactivado.",
            icon: "success"
          });

        });
      }
    });
  }

  ngOnInit(): void {
    this.getusuarios()
    this.usuarioForm = this.fb.group({
      id: [],
      email: [''],
      name: [''],
      password: [''],
      roles: [''],
      telefono: [''],
      estado: ['']
    });
  }

  onGlobalFilter(event: Event, table: any) {
    const input = event.target as HTMLInputElement;
    table.filterGlobal(input.value, 'contains');
  }

  getusuarios() {
    this.usuarios = [];
    this.usuariosinactivos=[]
    this.usuarioservice.getUsuarios().subscribe(
      (usuarios: Array<UserInfo>) => {
        for (let i=0; i<usuarios.length; i++){
          console.log(usuarios[i].estado)
          if (usuarios[i].estado=='Activo'){
            this.usuarios.push(usuarios[i]);
          }else if (usuarios[i].estado=='Inactivo'){
            this.usuariosinactivos.push(usuarios[i])
          }
        }
        console.log(this.usuarios);
      }
    )
  }
  showDialoginactivo() {
    this.visibleinactivo = true;
    }
  showDialog(usuarioid:number) {
    this.visible = true;
    this.usuarioservice.getUsuario_x_id(usuarioid).subscribe(
      usuario=>{
        this.usuarioForm.patchValue({
          id:usuario.id,
          email:usuario.email,
          name:usuario.name,
          password:usuario.password,
          roles:usuario.roles,
          telefono:usuario.telefono,
          estado:usuario.estado,
        })
      }
    );
  }
}
