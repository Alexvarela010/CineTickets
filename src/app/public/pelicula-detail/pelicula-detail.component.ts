import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PeliculaService} from '../../core/services/PeliculaService/pelicula.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Storage} from '@angular/fire/storage';
import {FuncionesService} from '../../core/services/FuncionesService/funciones.service';
import {UserInfo} from '../../core/models/UserInfo';
import {Funcion} from '../../core/models/Funcion';
import {Pagos} from '../../core/models/pagos';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {InputNumber} from 'primeng/inputnumber';
import {Pelicula} from '../../core/models/pelicula';
import {Calendar} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {Compra} from '../../core/models/Compra';
import {CompraService} from '../../core/services/CompraService/compra.service';
import Swal from 'sweetalert2';
import {CarritoService} from '../../core/services/CarritoCompras/carrito.service';
import {UsuariosService} from '../../core/services/UserService/usuarios.service';

@Component({
  selector: 'app-pelicula-detail',
  imports: [
    NgForOf,
    Dialog,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CurrencyPipe
  ],
  templateUrl: './pelicula-detail.component.html',
  styleUrl: './pelicula-detail.component.css'
})
export class PeliculaDetailComponent implements OnInit {
  constructor(private userService:UsuariosService,private carritoService:CarritoService,private route: ActivatedRoute, private funcionesService: FuncionesService, private peliculaService: PeliculaService, private fb: FormBuilder) {
  }

  funcionSelected!: Funcion;
  peliculaId!: number;
  peliculaSelected!: Pelicula;
  peliculaForm!: FormGroup;
  compraForm!: FormGroup;
  fechanormal: Array<string>=[]
  horanormal: Array<string>=[]
  funciones: Array<Funcion> = [];
  visible: boolean = false;
  private storage = inject(Storage);


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.peliculaId = params['id'];
      console.log(this.peliculaId)
    })
    this.compraForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]]
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
    this.cargarpelicula()
    this.cargarfunciones()
  }


  cargarfunciones() {
    this.funcionesService.getfunciones().subscribe(
      (funciones: Array<Funcion>) => {
        for (let i = 0; i < funciones.length; i++) {
          if (funciones[i].pelicula.peliculaId == this.peliculaId) {
            this.funciones.push(funciones[i]);
            let fecha = this.funciones[i].fecha.split("-")
            let mesDIa = `${fecha[1]}-${fecha[2]}`;
            this.fechanormal[i] = mesDIa;
            let hora = this.funciones[i].hora.split(":")
            let horaformat = `${hora[0]}-${hora[2]}`;
            this.horanormal[i] = horaformat
          }
        }
      }
    )

  }

  mostrarDialog(funcion: Funcion) {
    if (localStorage.getItem('rol') === 'user'){
      this.funcionSelected=funcion
      this.visible = true;
    }else{
      Swal.fire(
        'Error',
        `Para realizar una compra debes iniciar sesion primero`,
        'warning'
      )
    }

  }

  cargarpelicula() {
    this.peliculaService.getpelicula_x_id(this.peliculaId).subscribe(
      pelicula => {
        this.peliculaSelected = pelicula;
        this.peliculaForm.patchValue({
          peliculaId: this.peliculaId,
          titulo: pelicula.titulo,
          descripcion: pelicula.descripcion,
          categoria: pelicula.categoria,
          duracion: pelicula.duracion,
          estado: pelicula.estado,
          imagen: pelicula.imagen,
          imagenCarrusel: pelicula.imagenCarrusel,
          precioEntrada: pelicula.precioEntrada
        })
      }
    );

  }

  calcularTotal() {
    if (this.peliculaSelected && this.compraForm.value.cantidad) {
      return this.peliculaSelected.precioEntrada * this.compraForm.value.cantidad;
    }
    return 0;
  }

  comprarTickets() {
    const today = new Date();
    const fechaCompra = today.toISOString().split('T')[0];
    const idString = localStorage.getItem('id');
    const id = idString ? parseInt(idString, 10) : 0;

    if (this.compraForm.valid) {
      this.userService.getUsuario_x_id(id).subscribe(
        (usuario: UserInfo) => {
          const compra: Compra = {
            compraId: 0,
            pelicula: this.peliculaSelected,
            cantidadTickets: this.compraForm.value.cantidad,
            fechaCompra: fechaCompra,
            precioTotal: this.calcularTotal(),
            userInfo: usuario
          };
          this.carritoService.agregarCompra(compra, this.funcionSelected);
          this.compraForm.patchValue({
            cantidad:1
        }
      )
        })
      Swal.fire(
        'Compra añadida',
        `Se añadió tu compra con exito`,
        'success'
      ).then((result) => {
        if (result.isConfirmed) {
          this.visible=false
        }
      }
      )
    }
  }


  }
