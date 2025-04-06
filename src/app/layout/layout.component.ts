import {Component, inject, OnInit, signal} from '@angular/core';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import { RouterOutlet} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FooterComponent} from './footer/footer.component';
import {Menu} from 'primeng/menu';
import {MenuItem, } from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {Drawer} from 'primeng/drawer';
import {AuthRequest} from '../core/models/AuthRequest';
import Swal from 'sweetalert2';
import {AuthServiceService} from '../core/services/AuthService/auth-service.service';
import {Message} from 'primeng/message';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule,
    RouterOutlet, RouterOutlet, ReactiveFormsModule,
    FormsModule, FaIconComponent, FooterComponent, Menu, Ripple, Drawer, Message, NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  visible: boolean = false;
  visiblelogin: boolean = false;
  error: boolean = false;
  email: string = '';
  password: string = '';
  AuthForm: FormGroup;
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor( private formbuilder: FormBuilder, private authservice: AuthServiceService) {
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

  login(Auth: AuthRequest) {
    this.authservice.getToken(Auth).subscribe(
      () => {
          this.visiblelogin=false;
          this.AuthForm.reset();

    },(error) => {
        this.error=true;
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

}
