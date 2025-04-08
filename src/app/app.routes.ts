import { Routes } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import InicioComponent from './public/inicio/inicio.component';
import {PeliculasListComponent} from './admin/Gestion/Peliculas/peliculas-list/peliculas-list.component';
import {PeliculasFormComponent} from './admin/Gestion/Peliculas/peliculas-form/peliculas-form.component';
import {RegisterComponent} from './auth/register/register.component';
import {NotFoundComponent} from './public/not-found/not-found.component';
import {authGuardGuard} from './core/guards/auth-guard.guard';
import {AuthServiceService} from './core/services/AuthService/auth-service.service';
import {PagosListComponent} from './admin/Gestion/Pagos/pagos-list/pagos-list.component';
import {ComprasListComponent} from './admin/Gestion/Compras/compras-list/compras-list.component';
import {FuncionesFormComponent} from './admin/Gestion/Funciones/funciones-form/funciones-form.component';
import {FuncionesListComponent} from './admin/Gestion/Funciones/funciones-list/funciones-list.component';
import {adminGuard} from './core/guards/admin.guard';
import {UsuarioListComponent} from './admin/Gestion/Usuarios/usuario-list/usuario-list.component';
import {PeliculaDetailComponent} from './public/pelicula-detail/pelicula-detail.component';
import {LayoutAdminComponent} from './layout/layout-admin/layout-admin.component';
import {UserConfiguracionesComponent} from './public/user-configuraciones/user-configuraciones.component';

export const routes: Routes = [
  {path:'registrarse', component: RegisterComponent},
  {path:'', component: LayoutComponent,children:[
      {path:'inicio', component:InicioComponent},
      {path:'', component:InicioComponent},
      {path:'configuraciones', component:UserConfiguracionesComponent},
      {path:'peliculas-detail/:id', component:PeliculaDetailComponent},
      {path:'usuario/pagos', component:PagosListComponent}
    ]},
  {path:'Admin', component: LayoutAdminComponent,children:[
      {path: 'peliculas',canActivate:[adminGuard], component:PeliculasListComponent},
      {path: 'peliculas/:modo/:id',canActivate:[adminGuard], component:PeliculasFormComponent},
      {path: 'funciones/:modo/:id',canActivate:[adminGuard], component:FuncionesFormComponent},
      {path: 'funciones/:modo',canActivate:[adminGuard], component:FuncionesFormComponent},
      {path: 'funciones',canActivate:[adminGuard], component:FuncionesListComponent},
      {path: 'pagos',canActivate:[adminGuard], component:PagosListComponent},
      {path: 'compras',canActivate:[adminGuard], component:ComprasListComponent},
      {path: 'peliculas/:modo',canActivate:[adminGuard], component:PeliculasFormComponent},
      {path: 'usuarios',canActivate:[adminGuard], component:UsuarioListComponent},
    ]},

  {path:'**', component:  NotFoundComponent},

];
