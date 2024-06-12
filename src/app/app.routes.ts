import { Routes } from '@angular/router';
import { LandinpageComponent } from './components/landinpage/landinpage.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CreaeditacirugiasComponent } from './components/paciente/cirguias/creaeditacirugias/creaeditacirugias.component';
import { CreaeditaalergiasComponent } from './components/oncologo/alergias/creaeditaalergias/creaeditaalergias.component';
import { SeguroComponent } from './components/paciente/seguro/seguro.component';
import { CrearseguroComponent } from './components/paciente/seguro/crearseguro/crearseguro.component';
import { AlergiasComponent } from './components/oncologo/alergias/alergias.component';
import { CirguiasComponent } from './components/paciente/cirguias/cirguias.component';
import { UsersComponent } from './components/users/users.component';
import { CreaeditausersComponent } from './components/users/creaeditausers/creaeditausers.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreaeditarolesComponent } from './components/roles/creaeditaroles/creaeditaroles.component';


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
    path:'alergias',component: AlergiasComponent,
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

  {
  path:'users',component:UsersComponent,
  children:[
          {path:'nuevo',component:CreaeditausersComponent},
          {path:'ediciones/:id',component:CreaeditausersComponent}
           ]
  },

  {
  path:'rol',component:RolesComponent,
  children:[
          {path:'nuevo',component:CreaeditarolesComponent},
          {path:'ediciones/:id',component:CreaeditarolesComponent}
           ]
  },


];
