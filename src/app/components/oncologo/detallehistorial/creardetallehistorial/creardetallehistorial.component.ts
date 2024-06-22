import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DetalleHistorial } from '../../../../models/detallehistorial';
import { ServiciodetallehistorialService } from '../../../../services/serviciodetallehistorial.service';
import { Seguro } from '../../../../models/seguro';
import { SeguroService } from '../../../../services/seguro.service';
import { Cirugias } from '../../../../models/cirugias';
import { Tratamiento } from '../../../../models/tratamiento';
import { Examendeteccion } from '../../../../models/examendeteccion';
import { Paciente } from '../../../../models/paciente';
import { CirugiasService } from '../../../../services/cirugias.service';
import { TratamientoService } from '../../../../services/tratamiento.service';
import { PacienteService } from '../../../../services/paciente.service';
import { Serviceexamen } from '../../../../services/serviceexamen.service';


@Component({
  selector: 'app-creardetallehistorial',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink],

  templateUrl: './creardetallehistorial.component.html',
  styleUrl: './creardetallehistorial.component.css'
})

export class CreardetallehistorialComponent implements OnInit {
  Form: FormGroup = new FormGroup({});
  detallehistorial: DetalleHistorial = new DetalleHistorial();
  listaseguros: Seguro[]=[];
  listacirugias: Cirugias[]=[];
  listatratamiento: Tratamiento[]=[];
  listaexamendeteccion: Examendeteccion[]=[];
  listapaciente: Paciente[]=[]

  constructor(
    private FormBuilber: FormBuilder,
    private dS: ServiciodetallehistorialService,
    private Router: Router,
    private ss:SeguroService,
    private cs:CirugiasService,
    private ts:TratamientoService,
    private es:Serviceexamen,
    private ps:PacienteService
  ) {}

  ngOnInit(): void {
    this.Form = this.FormBuilber.group({
      idDetalleHistorial:['', Validators.required],
      fechaDetalleHistorial: ['',Validators.required],
      seguro:['',Validators.required],
      cirugias:['',Validators.required],
      tratamiento:['',Validators.required],
      examenDeteccion:['',Validators.required],
      paciente:['',Validators.required],
    })
    this.ss.list().subscribe((data)=>{
      this.listaseguros=data;
  });

  this.cs.list().subscribe((data)=>{
    this.listacirugias=data;
  });
  this.ts.list().subscribe((data)=>{
    this.listatratamiento=data;
  }); 
  
  this.es.list().subscribe((data)=>{
    this.listaexamendeteccion=data;
  }); 
  
  this.ps.list().subscribe((data)=>{
    this.listapaciente=data;
  });
  }
  guardar(): void {
    if (this.Form.valid) {
      this.detallehistorial.idDetalleHistorial =  this.Form.value.idDetalleHistorial;
      this.detallehistorial.fechaDetalleHistorial =  this.Form.value.fechaDetalleHistorial;
      this.detallehistorial.seguro =  this.Form.value.seguro.idseguro;
      this.detallehistorial.cirugias =  this.Form.value.cirugias.idcirugias;
      this.detallehistorial.tratamiento =  this.Form.value.tratamiento.idTratamiento;
      this.detallehistorial.examenDeteccion =  this.Form.value.examenDeteccion.examenDeteccionId;
      this.detallehistorial.paciente =  this.Form.value.paciente.idPaciente;
      
      this.dS.insert(this.detallehistorial).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
        this.Router.navigate(['DetalleHistorial']);
      });
    }
  }
}
