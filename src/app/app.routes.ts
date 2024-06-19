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
import { EspecialidadComponent } from './components/especialidad/especialidad.component';
import { CrearEspecialidadComponent } from './components/especialidad/crear-especialidad/crear-especialidad.component';
import { TipoTratamientoComponent } from './components/tipo-tratamiento/tipo-tratamiento.component';
import { CrearTipoTratamientoComponent } from './components/tipo-tratamiento/crear-tipo-tratamiento/crear-tipo-tratamiento.component';
import { segGuard } from './guard/seguridad.guard';
import { ExamendeteccionComponent } from './components/examendeteccion/examendeteccion.component';
import { CreaeditaexamenComponent } from './components/examendeteccion/creaeditaexamen/creaeditaexamen.component';
import { HerramientaComponent } from './components/oncologo/herramienta/herramienta.component';
import { CreaeditaherramientaComponent } from './components/oncologo/herramienta/creaeditaherramienta/creaeditaherramienta.component';
import { CreardetallehistorialComponent } from './components/oncologo/detallehistorial/creardetallehistorial/creardetallehistorial.component';
import { DetallehistorialComponent } from './components/oncologo/detallehistorial/detallehistorial.component';



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
    path: 'home',component: HomeComponent,
    canActivate: [segGuard],

  },
  {
    path:'alergias',component: AlergiasComponent,
    children:[
        {path:'nuevo',component: CreaeditaalergiasComponent},
        {path:'ediciones/:id',component:CreaeditaalergiasComponent}
             ],
             canActivate: [segGuard],
  },
  {
    path:'cirugias',component: CirguiasComponent, 
    children:[

        {path:'nuevo', component:CreaeditacirugiasComponent},
        {path:'ediciones/:id',component:CreaeditacirugiasComponent}
        
            ],
            canActivate: [segGuard],
  },

  {
  path:'seguros',component:SeguroComponent,
  children:[
          {path:'nuevo',component:CrearseguroComponent},
          {path:'ediciones/:id',component:CrearseguroComponent}
           ],
           canActivate: [segGuard],
  },

  {
  path:'users',component:UsersComponent,
  children:[
          {path:'nuevo',component:CreaeditausersComponent},
          {path:'ediciones/:id',component:CreaeditausersComponent}
           ],
           canActivate: [segGuard],
  },

  {
  path:'rol',component:RolesComponent,
  children:[
          {path:'nuevo',component:CreaeditarolesComponent},
          {path:'ediciones/:id',component:CreaeditarolesComponent}
           ],
           canActivate: [segGuard],
  },
{
  path:'especialidades',component:EspecialidadComponent,
  children:[
          {path:'nuevo',component:CrearEspecialidadComponent},
          {path:'ediciones/:id',component:CrearEspecialidadComponent}       
  ],
  canActivate: [segGuard],
},
{
  path:'tipotratamientos',component:TipoTratamientoComponent,
  children:[
          {path:'nuevo',component:CrearTipoTratamientoComponent},
          {path:'ediciones/:id',component:CrearTipoTratamientoComponent}       
  ],
  canActivate: [segGuard],
},
{
  path:'examenes',component:ExamendeteccionComponent,
  children:[
    {path:'nuevo',component:CreaeditaexamenComponent},
    {path:'ediciones/:id',component:CreaeditaexamenComponent}
    ],
    canActivate: [segGuard],
},

{
  path:'herramientas',component:HerramientaComponent,
  children:[
    {path:'nuevo',component:CreaeditaherramientaComponent},
    {path:'ediciones/:id',component:CreaeditaherramientaComponent}
    ],
    canActivate: [segGuard],
},

{
  path:'DetalleHistorial',component:DetallehistorialComponent,
  children:[
    {path:'nuevo',component:CreardetallehistorialComponent},
    ],
    canActivate: [segGuard],
},

];
