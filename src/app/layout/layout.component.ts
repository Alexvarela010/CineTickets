import {Component, inject, signal} from '@angular/core';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatListModule,
    RouterOutlet, RouterOutlet, RouterLink, ReactiveFormsModule,
    FormsModule, MatMenu, MatMenuTrigger, MatMenuItem, FaIconComponent, MatMenuContent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }


  protected readonly faUser = faUser;
}
