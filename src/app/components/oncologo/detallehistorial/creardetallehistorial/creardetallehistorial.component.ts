import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DetalleHistorial } from '../../../../models/detallehistorial';
import { ServiciodetallehistorialService } from '../../../../services/serviciodetallehistorial.service';

@Component({
  selector: 'app-creardetallehistorial',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule],
  templateUrl: './creardetallehistorial.component.html',
  styleUrl: './creardetallehistorial.component.css'
})
export class CreardetallehistorialComponent implements OnInit {
  Form: FormGroup = new FormGroup({});
  Service: DetalleHistorial = new DetalleHistorial();

  constructor(
    private FormBuilber: FormBuilder,
    private dS: ServiciodetallehistorialService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.Form = this.FormBuilber.group({
      fechaDetalleHistorial: ['',[
      Validators.required,
      this.fechaValidar()
      ]],
      
    });
  }

  guardar(): void {
    if (this.Form.valid) {
      this.Service.idDetalleHistorial =  this.Form.value.codigo;
      this.Service.fechaDetalleHistorial =  this.Form.value.fechaDetalleHistorial;
      this.Service.seguro.idseguro =  this.Form.value.codigoseguro;
      this.Service.cirugia.idcirugias =  this.Form.value.codigocirugia;
      this.Service.tratamiento.idTratamiento =  this.Form.value.codigotratamiento;
      this.Service.examendeteccion.examenDeteccionId =  this.Form.value.codigoexamendeteccion;
      this.Service.paciente.idPaciente =  this.Form.value.codigopaciente;
      
      this.dS.insert(this.Service).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
        this.Router.navigate(['DetalleHistorial']);
      });
    }
  }

  fechaValidar() {
    return (control: { value: string; }) => {
      const FechaControl = new Date(control.value);

      if (FechaControl > new Date()) {
        return { fechaServicioVal: true };
      }else{
        return null;
      }
    };
  }
}
