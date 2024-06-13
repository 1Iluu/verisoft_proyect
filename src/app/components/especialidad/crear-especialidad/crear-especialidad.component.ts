import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Especialidad } from './../../../models/especialidad';

@Component({
  selector: 'app-crear-especialidad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-especialidad.component.html',
  styleUrls: ['./crear-especialidad.component.css']
})
export class CrearEspecialidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  especialidad: Especialidad = new Especialidad();
  id: number = 0;
  edicion: boolean = false;

  listaComplejidades: { value: string; viewValue: string }[] = [
    { value: 'Baja', viewValue: 'Baja' },
    { value: 'Media', viewValue: 'Media' },
    { value: 'Alta', viewValue: 'Alta' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private especialidadService: EspecialidadService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      nombreEspecialidad: ['', Validators.required],
      complejidad: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.especialidad.id = this.id;
      this.especialidad.nombreEspecialidad = this.form.value.nombreEspecialidad;
      this.especialidad.complejidad = this.form.value.complejidad;

      if (this.edicion) {
        this.especialidadService.update(this.especialidad).subscribe(() => {
          this.especialidadService.list().subscribe((data) => {
            this.especialidadService.setList(data);
          });
        });
      } else {
        this.especialidadService.insert(this.especialidad).subscribe(() => {
          this.especialidadService.list().subscribe((data) => {
            this.especialidadService.setList(data);
          });
        });
      }
      this.router.navigate(['especialidades']);
    }
  }

  init() {
    if (this.edicion) {
      this.especialidadService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombreEspecialidad: new FormControl(data.nombreEspecialidad),
          complejidad: new FormControl(data.complejidad),
        });
      });
    }
  }
}
