import {Component, inject, OnInit, signal} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MatToolbar} from "@angular/material/toolbar";
import {Menu} from "primeng/menu";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {MatButton} from '@angular/material/button';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {FooterComponent} from '../footer/footer.component';
import {MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {NgIf} from '@angular/common';
import {Drawer} from 'primeng/drawer';
import {Message} from 'primeng/message';
import {AuthRequest} from '../../core/models/AuthRequest';
import {AuthServiceService} from '../../core/services/AuthService/auth-service.service';

@Component({
  selector: 'app-layout-admin',
  imports: [

    FaIconComponent,
    MatButton,
    MatToolbar,
    Menu,
    ReactiveFormsModule,
    RouterLink,
    FooterComponent,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    NgIf,
    Drawer,
    Message,
  ],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent implements OnInit {
  protected readonly isMobile = signal(true);
  email: string = '';
  password: string = '';
  AuthForm: FormGroup;
  error: boolean = false;
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  visiblelogin: boolean = false;

  constructor(private router:Router,private authservice: AuthServiceService, private formbuilder: FormBuilder) {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.AuthForm = this.formbuilder.group({
      'username': ['', Validators.required, Validators.email],
      'password': ['', Validators.required]
    })
  }

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        separator: true
      },
      {
        label: 'Perfil',
        items: [
          {
            label: 'Configuraciones',
            icon: 'pi pi-cog',
            shortcut: '⌘+O'
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            shortcut: '⌘+Q',
            command: () => this.logout()
          }
        ]
      },
      {
        separator: true
      }
    ];
  }

  logout() {
    localStorage.clear()
    console.log(localStorage)
  }
  configuraciones() {
    this.router.navigate(['/configuraciones'])
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
  protected readonly faUser = faUser;
  protected readonly localStorage = localStorage;
}
