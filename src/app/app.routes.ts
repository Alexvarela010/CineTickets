import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import InicioComponent from './public/inicio/inicio.component';

export const routes: Routes = [
  {path:'', component: LayoutComponent,children:[
      {path:'inicio',component:InicioComponent},
    ]},

];
