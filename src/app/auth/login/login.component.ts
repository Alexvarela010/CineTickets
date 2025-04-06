import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthRequest} from '../../core/models/AuthRequest';
import {AuthServiceService} from '../../core/services/AuthService/auth-service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  AuthForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private formbuilder: FormBuilder, private authservice:AuthServiceService) {
    this.AuthForm = this.formbuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  login(Auth:AuthRequest) {
    console.log('Login:', this.email, this.password);
    this.dialogRef.close(); // cerrar si quieres
    this.authservice.getToken(Auth).subscribe(
      (Auth:string)=>{
        Swal.fire(
          'Token extraido',
          `${Auth.toString()} ha sido creada con exito`,
          'success'
        );
        this.AuthForm.reset();
      }
    );
  }

}
