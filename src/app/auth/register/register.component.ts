import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserInfo} from '../../core/models/UserInfo';
import {UsuariosService} from '../../core/services/UserService/usuarios.service';
import {Pelicula} from '../../core/models/pelicula';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioservie:UsuariosService, private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: 'ROLE_USER',
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      estado: ['Activo']
    });
  }

  onSubmit(usuario:UserInfo): void {
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
     this.usuarioservie.crearUsuario(usuario).subscribe(
       () => {
         Swal.fire(
           'Usuario creado',
           `${usuario.name} ha sido creada con exito`,
           'success'
         ).then((result)=>{
           if (result.isConfirmed){
             this.volver()
           }
         })

       }
     )
    }
  }
  volver(): void {
    this.router.navigate(['inicio'])
  }
}
