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
import { OncologoComponent } from './components/oncologo/oncologo.component';
import { CreaeditaoncologoComponent } from './components/oncologo/creaeditaoncologo/creaeditaoncologo.component';
import { HerramientaComponent } from './components/oncologo/herramienta/herramienta.component';
import { CreaeditaherramientaComponent } from './components/oncologo/herramienta/creaeditaherramienta/creaeditaherramienta.component';
import { CreardetallehistorialComponent } from './components/oncologo/detallehistorial/creardetallehistorial/creardetallehistorial.component';
import { DetallehistorialComponent } from './components/oncologo/detallehistorial/detallehistorial.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CreaeditacomentarioComponent } from './components/comentario/creaeditacomentario/creaeditacomentario.component';
import { CitaComponent } from './components/cita/cita.component';
import { CreaeditacitaComponent } from './components/cita/creaeditacita/creaeditacita.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { CreaeditarespuestaComponent } from './components/respuesta/creaeditarespuesta/creaeditarespuesta.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { creaeditapaciente } from './components/pacientes/creaeditapaciente/creaeditapaciente.component';
import { TratamientoComponent } from './components/tratamiento/tratamiento.component';
import { CreaeditatratamientoComponent } from './components/tratamiento/creaeditatratamiento/creaeditatratamiento.component';
import { ReportsafComponent } from './components/reportsaf/reportsaf.component';
import { ReportsComponent } from './components/reports/reports.component';
import { JosereportsComponent } from './components/josereports/josereports.component';
import { ReportCardenas2Component } from './components/josereports/report-cardenas2/report-cardenas2.component';
import { reportAbrigo02 } from './components/reportsaf/report-abrigo02/report-abrigo02.component';
import { Report02Component } from './components/reports/report02/report02.component';








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
  path: 'oncologos', component: OncologoComponent,
  children: [
    {
      path: 'nuevo', component: CreaeditaoncologoComponent
    },
    {
      path: 'ediciones/:id', component: CreaeditaoncologoComponent
    },
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
  path:'comentario',component:ComentarioComponent,
  children:[
    {path:'nuevo',component:CreaeditacomentarioComponent},
    {path:'ediciones/:id',component:CreaeditacomentarioComponent}
    ],
    canActivate: [segGuard],
},
{
  path:'cita',component:CitaComponent,
  children:[
    {path:'nuevo',component:CreaeditacitaComponent},
    {path:'ediciones/:id',component:CreaeditacitaComponent}
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
{

  path: 'pacientes', component: PacientesComponent,
  children:[
    {path:'nuevo',component: creaeditapaciente},
    {path:'ediciones/:id',component:creaeditapaciente}
         ],
         canActivate: [segGuard],
},
{
  path: 'respuestas', component: RespuestaComponent,
  children:[
    {path:'nuevo',component: CreaeditarespuestaComponent},
    {path:'ediciones/:id',component:CreaeditarespuestaComponent}
         ],
         canActivate: [segGuard],
},
{
  path: 'tratamientos',
  component: TratamientoComponent,
  children: [
    { path: 'nuevo', component: CreaeditatratamientoComponent },
    { path: 'ediciones/:id', component: CreaeditatratamientoComponent },
  ],
  canActivate: [segGuard],
},
{
  path: 'reportes', component:ReportsComponent,
  children:[{
    path:'reportes02',
    component:Report02Component},
    
],
canActivate: [segGuard],
},
{
  path: 'cardenas1',
  component: JosereportsComponent,
  children: [
    { path: 'cardenas2', component: ReportCardenas2Component },
  ],
  canActivate: [segGuard],
},



{
  path:'reportesAbrigo1',
  component:ReportsafComponent,
  children:[{
    path: 'reportesAbrigo2',
    component:reportAbrigo02
  },
  ],
}
];
