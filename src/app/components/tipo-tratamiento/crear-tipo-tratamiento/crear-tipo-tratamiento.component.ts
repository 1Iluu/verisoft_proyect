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
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoTratamientoService } from '../../../services/tipo-tratamiento.service'; 
import { TipoTratamiento } from '../../../models/tipo_de_tratamiento'; 

@Component({
  selector: 'app-crear-tipo-tratamiento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crear-tipo-tratamiento.component.html',
  styleUrls: ['./crear-tipo-tratamiento.component.css']
})
export class CrearTipoTratamientoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoTratamiento: TipoTratamiento = new TipoTratamiento();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tipoTratamientoService: TipoTratamientoService,
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
      nombreTratamiento: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tipoTratamiento.id = this.id;
      this.tipoTratamiento.nombreTratamiento = this.form.value.nombreTratamiento;

      if (this.edicion) {
        this.tipoTratamientoService.update(this.tipoTratamiento).subscribe(() => {
          this.tipoTratamientoService.list().subscribe((data) => {
            this.tipoTratamientoService.setList(data);
          });
        });
      } else {
        this.tipoTratamientoService.insert(this.tipoTratamiento).subscribe(() => {
          this.tipoTratamientoService.list().subscribe((data) => {
            this.tipoTratamientoService.setList(data);
          });
        });
      }
      this.router.navigate(['tipotratamientos']);
    }
  }

  init() {
    if (this.edicion) {
      this.tipoTratamientoService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombreTratamiento: new FormControl(data.nombreTratamiento),
        });
      });
    }
  }
}
