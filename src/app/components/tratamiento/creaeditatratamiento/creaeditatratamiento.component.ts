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
import { Oncologo } from '../../../models/oncologo';
import { OncologoService } from '../../../services/oncologo.service';
import { MatSelectModule } from '@angular/material/select';
import { TipoTratamiento } from '../../../models/tipo_de_tratamiento';
import { Cita } from '../../../models/cita';
import { TipoTratamientoService } from '../../../services/tipo-tratamiento.service';
import { CitaService } from '../../../services/cita.service';

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
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './creaeditatratamiento.component.html',
  styleUrl: './creaeditatratamiento.component.css',
})
export class CreaeditatratamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tratamiento: Tratamiento = new Tratamiento();
  id: number = 0;
  edicion: boolean = false;
  listaOncologo: Oncologo[] = [];
  listaTiposTratamiento: TipoTratamiento[] = [];
  listaCitas: Cita[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tratamientoService: TratamientoService,
    private oncologoService: OncologoService,
    private tiposTratamiento: TipoTratamientoService,
    private citas: CitaService,
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
      tipoTratamiento: ['', Validators.required],
      cita: ['', Validators.required],
      oncologo: ['', Validators.required],
    });

    this.oncologoService.list().subscribe((data) => {
      this.listaOncologo = data;
    });

    this.tiposTratamiento.list().subscribe((data) => {
      this.listaTiposTratamiento = data;
    })

    this.citas.list().subscribe((data) => {
      this.listaCitas = data;
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      const formValues = this.form.value;

      this.tratamiento = {
        ...this.tratamiento,
        idTratamiento: this.id,
        descripcionTratamiento: formValues.descripcion,
        estadoTratamiento: formValues.estado,
        presupuestoTratamiento: formValues.presupuesto,
        fechaTratamiento: formValues.fecha,
        horasTratamiento: formValues.horas,
        efectosEsperadosTratamiento: formValues.efectosEsperados,
        oncologo: {
          ...this.tratamiento.oncologo,
          oncologo_id: formValues.oncologo,
        },
        cita: {
          ...this.tratamiento.cita,
          idCita: formValues.cita,
        },
        tipoTratamiento: {
          ...this.tratamiento.tipoTratamiento,
          id: formValues.tipoTratamiento,
        },
      };

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
          cita: this.tratamiento.cita.idCita,
          tipoTratamiento: this.tratamiento.tipoTratamiento.id,
          oncologo: this.tratamiento.oncologo.oncologo_id,
        });
      });
    }
  }
}
