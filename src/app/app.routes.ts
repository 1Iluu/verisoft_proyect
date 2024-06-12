import { Routes } from '@angular/router';

import { LandinpageComponent } from './components/landinpage/landinpage.component';
import { LoginComponent } from './components/login/login.component';

import { PacienteComponent } from './components/paciente/paciente.component';

import { HomeComponent } from './components/home/home.component';
import { ListarsegurosComponent } from './components/paciente/seguro/listarseguros/listarseguros.component';
import { CrearseguroComponent } from './components/paciente/seguro/crearseguro/crearseguro.component';
import { SeguroComponent } from './components/paciente/seguro/seguro.component';
import { EspecialidadComponent } from './components/especialidad/especialidad.component';
import { CrearEspecialidadComponent } from './components/especialidad/crear-especialidad/crear-especialidad.component';
import { TipoTratamientoComponent } from './components/tipo-tratamiento/tipo-tratamiento.component';
import { CrearTipoTratamientoComponent } from './components/tipo-tratamiento/crear-tipo-tratamiento/crear-tipo-tratamiento.component';

export const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'landing', pathMatch: 'full'
  },
  {
    path: 'landing', component: LandinpageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',component: HomeComponent
    
  },
  {
    path:'seguros',component:SeguroComponent,
    children:[
            {path:'nuevo',component:CrearseguroComponent},
            {path:'ediciones/:id',component:CrearseguroComponent}       
    ]
  },
  {
    path:'especialidades',component:EspecialidadComponent,
    children:[
            {path:'nuevo',component:CrearEspecialidadComponent},
            {path:'ediciones/:id',component:CrearseguroComponent}       
    ]
  },
  {
    path:'tipotratamientos',component:TipoTratamientoComponent,
    children:[
            {path:'nuevo',component:CrearTipoTratamientoComponent},
            {path:'ediciones/:id',component:CrearTipoTratamientoComponent}       
    ]
  }




    
];
