import {Component, inject, OnInit, signal} from '@angular/core';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FooterComponent} from './footer/footer.component';
import {Menu} from 'primeng/menu';
import {MenuItem,} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {Drawer} from 'primeng/drawer';
import {AuthRequest} from '../core/models/AuthRequest';
import {AuthServiceService} from '../core/services/AuthService/auth-service.service';
import {Message} from 'primeng/message';
import {NgForOf, NgIf} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {CarritoService} from '../core/services/CarritoCompras/carrito.service';
import {Compra} from '../core/models/Compra';
import {Detallecompra} from '../core/models/Detallecompra';
import {CompraService} from '../core/services/CompraService/compra.service';
import {PagoService} from '../core/services/PagoService/pago.service';
import {Pagos} from '../core/models/pagos';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule,
    RouterOutlet, RouterOutlet, ReactiveFormsModule,
    FormsModule, FaIconComponent, FooterComponent, Menu, Ripple, Drawer, Message, NgIf, RouterLink, Dialog, NgForOf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  visible: boolean = false;
  visiblelogin: boolean = false;
  visiblecar: boolean = false;
  visiblepago: boolean = false;
  error: boolean = false;
  email: string = '';
  password: string = '';
  idpago: number = 0;
  carrito: Array<Compra> = []
  detalle: Array<Detallecompra> = []
  AuthForm: FormGroup;
  pagoform: FormGroup;
  pago: Pagos = new Pagos();
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(private pagoService: PagoService, private compraService: CompraService, private carritoService: CarritoService, private formbuilder: FormBuilder, private authservice: AuthServiceService) {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.AuthForm = this.formbuilder.group({
      'username': ['', Validators.required, Validators.email],
      'password': ['', Validators.required]
    })
    this.pagoform = this.formbuilder.group({
      'metodopago': ['PSE', Validators.required],
      'estadopago': ['Pendiente'],
    })
  }

  abrirmodal() {
    if (localStorage.getItem('rol') === 'user') {
      this.carrito = this.carritoService.getCompras();
      this.detalle = this.carritoService.getDetalles();
      this.visiblecar = true;
    } else {
      Swal.fire(
        'Error',
        `Para realizar una compra debes iniciar sesion primero`,
        'warning'
      )
    }
  }

  eliminarDelCarrito(item: number) {
    this.carritoService.eliminarCompra(item)
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, compra) => {
      return total + (compra.precioTotal || 0);
    }, 0);
  }

  abrirpago() {
    this.visiblepago = true;
    this.visiblecar = false;
  }

  enviaremail() {
    emailjs.send("service_9ys4imd", "template_z58v0t7", {
        order_id: this.idpago,
        cost: this.obtenerTotal(),
        total: this.obtenerTotal(),
        logo: 'https://firebasestorage.googleapis.com/v0/b/cinetickets-f28c2.firebasestorage.app/o/logo%2FCineTicketsLogo.png?alt=media&token=83759bdb-d2f0-42d2-86a3-db2668a9327e',
        email: localStorage.getItem('user'),
      },
      "mQAg8tV1C11Y_UG4A"
    ).then(
      (response) => {
        console.log('Correo enviado', response);
        alert('¡Correo enviado con éxito!');
      },
      (error) => {
        console.error('Error al enviar correo', error);
        alert('Error al enviar el correo.');
      })

  }

  confirmarCompra() {
    const estados = ['pendiente', 'rechazado', 'aprobado'];
    const randomIndex = Math.floor(Math.random() * 3);
    this.pago.metodopago = this.pagoform.get('metodopago')?.value;
    this.pago.id = 0;
    this.pago.estadopago = estados[randomIndex];
    for (let i = 0; i < this.carrito.length; i++) {
      this.compraService.addCompras(this.carrito[i]).subscribe(
        (compra: Compra) => {
          this.pago.compra = compra;
          this.pagoService.addPago(this.pago).subscribe(
            (pago: Pagos) => {
                this.idpago=pago.id;
            }
          );
          this.detalle[i].compra = compra;
          this.visiblepago = false;
          this.compraService.adddetalleCompras(this.detalle[i]).subscribe(
            () => {
              Swal.fire({
                  title: "Pago en proceso",
                  text: "El pago se está procesando, en unos momentos se le notificará el estado del mismo mediante su correo",
                  icon: "success"
                }
              )
            }
          )
        }
      )

    }

      this.enviaremail();
    this.carritoService.limpiarCarrito();
  }

  login(Auth: AuthRequest) {
    this.authservice.getToken(Auth).subscribe(
      () => {
        this.visiblelogin = false;
        this.AuthForm.reset();

      }, (error) => {
        this.error = true;
      }
    );
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }


  protected readonly faUser = faUser;

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        separator: true
      },
      {
        label: 'Documents',
        items: [
          {
            label: 'New',
            icon: 'pi pi-plus',
            shortcut: '⌘+N'
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
            shortcut: '⌘+S'
          }
        ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+O'
          },
          {
            label: 'Messages',
            icon: 'pi pi-inbox',
            badge: '2'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q'
          }
        ]
      },
      {
        separator: true
      }
    ];
  }

  protected readonly localStorage = localStorage;
  protected readonly console = console;
}
