import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import InicioComponent from './public/inicio/inicio.component';
import {UsuarioListComponent} from './admin/Gestion/Usuarios/usuario-list/usuario-list.component';
import {PeliculasListComponent} from './admin/Gestion/Peliculas/peliculas-list/peliculas-list.component';
import {PeliculasFormComponent} from './admin/Gestion/Peliculas/peliculas-form/peliculas-form.component';

export const routes: Routes = [
  {path:'', component: LayoutComponent,children:[
      {path:'inicio',component:InicioComponent},
      {path: 'Admin/peliculas', component:PeliculasListComponent},
      {path: 'Admin/peliculas/crear', component:PeliculasFormComponent},
    ]},

];
