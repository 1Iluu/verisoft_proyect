import { Routes } from '@angular/router';

import { LandinpageComponent } from './components/landinpage/landinpage.component';
import { LoginComponent } from './components/login/login.component';

import { PacienteComponent } from './components/paciente/paciente.component';

import { HomeComponent } from './components/home/home.component';
import { ListarsegurosComponent } from './components/paciente/seguro/listarseguros/listarseguros.component';
import { CrearseguroComponent } from './components/paciente/seguro/crearseguro/crearseguro.component';
import { SeguroComponent } from './components/paciente/seguro/seguro.component';

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

}




    
];
