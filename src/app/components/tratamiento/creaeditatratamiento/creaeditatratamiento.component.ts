import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tratamiento } from '../../../models/tratamiento';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TratamientoService } from '../../../services/tratamiento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditatratamiento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './creaeditatratamiento.component.html',
  styleUrl: './creaeditatratamiento.component.css',
})
export class CreaeditatratamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tratamiento: Tratamiento = new Tratamiento();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tratamientoService: TratamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      presupuesto: ['', Validators.required],
      fecha: ['', Validators.required],
      horas: ['', Validators.required],
      efectosEsperados: ['', Validators.required],
      oncologo: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tratamiento.idTratamiento = this.id;
      this.tratamiento.descripcionTratamiento = this.form.value.descripcion;
      this.tratamiento.estadoTratamiento = this.form.value.estado;
      this.tratamiento.presupuestoTratamiento = this.form.value.presupuesto;
      this.tratamiento.fechaTratamiento = this.form.value.fecha;
      this.tratamiento.horasTratamiento = this.form.value.horas;
      this.tratamiento.efectosEsperadosTratamiento =
        this.form.value.efectosEsperados;
      this.tratamiento.oncologo.oncologo_id = this.form.value.oncologo;

      if (this.edicion) {
        this.tratamientoService.update(this.tratamiento).subscribe(() => {
          this.tratamientoService.list().subscribe((data) => {
            this.tratamientoService.setList(data);
          });
        });
      } else {
        this.tratamientoService.insert(this.tratamiento).subscribe(() => {
          this.tratamientoService.list().subscribe((data) => {
            this.tratamientoService.setList(data);
          });
        });
      }

      this.router.navigate(['tratamientos']);
    }
  }

  init() {
    if (this.edicion) {
      this.tratamientoService.listId(this.id).subscribe((data) => {
        this.tratamiento = data;
        this.form.setValue({
          descripcion: this.tratamiento.descripcionTratamiento,
          estado: this.tratamiento.estadoTratamiento,
          presupuesto: this.tratamiento.presupuestoTratamiento,
          fecha: this.tratamiento.fechaTratamiento,
          horas: this.tratamiento.horasTratamiento,
          efectosEsperados: this.tratamiento.efectosEsperadosTratamiento,
          oncologo: this.tratamiento.oncologo.oncologo_id,
        });
      });
    }
  }
}
