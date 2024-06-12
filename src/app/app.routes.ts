import { Routes } from '@angular/router';
import { LandinpageComponent } from './components/landinpage/landinpage.component';
import { LoginComponent } from './components/login/login.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { HomeComponent } from './components/home/home.component';
import { ListaralergiasComponent } from './components/oncologo/listaralergias/listaralergias.component';
import { oncologoComponent } from './components/oncologo/oncologo.component';
import { CreaeditaalergiasComponent } from './components/oncologo/creaeditaalergias/creaeditaalergias.component';
import { SeguroComponent } from './components/paciente/seguro/seguro.component';
import { CrearseguroComponent } from './components/paciente/seguro/crearseguro/crearseguro.component';
import { CirguiasComponent } from './components/paciente/cirguias/cirguias.component';
import { CreaeditacirugiasComponent } from './components/paciente/cirguias/creaeditacirugias/creaeditacirugias.component';


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
    path:'alergias',component:ListaralergiasComponent,
    
  },
  {
    path:'alergias',component:oncologoComponent,
    children:[
        {path:'nuevo',component: CreaeditaalergiasComponent},
        {path:'ediciones/:id',component:CreaeditaalergiasComponent}
    ]
  },

  {
    path:'cirugias',component: CirguiasComponent, 
    children:[
        {path:'nuevo', component:CreaeditacirugiasComponent},
        {path:'ediciones/:id',component:CreaeditacirugiasComponent}
        
    ]
  },

  {
    path:'seguros',component:SeguroComponent,
    children:[
            {path:'nuevo',component:CrearseguroComponent},
            {path:'ediciones/:id',component:CrearseguroComponent}
    ]
  },




];
