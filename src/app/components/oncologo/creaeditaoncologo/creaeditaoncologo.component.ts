import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Oncologo } from '../../../models/oncologo';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { OncologoService } from '../../../services/oncologo.service';

@Component({
  selector: 'app-creaeditaoncologo',
  standalone: true,
  imports: [MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    MatCardModule],
  templateUrl: './creaeditaoncologo.component.html',
  styleUrl: './creaeditaoncologo.component.css'
})
export class CreaeditaoncologoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  Oncologo: Oncologo=new Oncologo();
  mensaje: string = '';
  id: number = 0;
  cantidad_pacientes: number=0;
  edicion: boolean = false;
  listaUsers: Users[] = [];
  idUserSeleccionado:number=0
  nombreyapellido: string = '';
  educacion:{value:string,viewValue:string}[]=[{value:'Completa',viewValue:'Completa'},
  {value:'Parcial',viewValue:'Parcial'}, {value:'Secundaria Completa',viewValue:'Secundaria Completa'},
  {value:'Practicante',viewValue:'Practicante'}, {value:'Licenciado',viewValue:'Licenciado'},
  {value:'Maestro',viewValue:'Maestro'}, {value:'Doctor',viewValue:'Doctor'}]
  constructor(
    private oS: OncologoService,
    private uS: UsersService,
    private router: Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      Oncologo_id: ['',],
      user_id: ['', Validators.required],
      nombreyapellido: ['', Validators.required],
      experiencia_laboral_anios: ['', [Validators.required, this.validateNumero]],
      educacion_universitaria: ['',[Validators.required, Validators.maxLength(30)]],
      cantidad_pacientes: ['', [Validators.required, this.validateNumero]],
      horario_atencion: ['',[Validators.required, Validators.maxLength(100), Validators.pattern(/^[0-9:-]+$/)]],
      salario: ['', [Validators.required, this.validateDecimal]],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.Oncologo.oncologo_id = this.form.value.Oncologo_id;
      this.Oncologo.user_id.id = this.form.value.user_id;
      this.Oncologo.nombreyapellido = this.form.value.nombreyapellido_id;
      this.Oncologo.experiencia_laboral_anios = this.form.value.experiencia_laboral_anios;
      this.Oncologo.cantidad_pacientes = this.form.value.cantidad_pacientes;
      this.Oncologo.horario_atencion = this.form.value.horario_atencion;
      this.Oncologo.salario = this.form.value.salario;
      if(this.edicion){
        this.oS.update(this.Oncologo).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          })
        })
      } else {
        this.oS.insert(this.Oncologo).subscribe(data=>{
          this.oS.list().subscribe(data=>{
            this.oS.setList(data);
          })
        });
      }
      this.router.navigate(['/components/Oncologo'])
    } else {
      this.mensaje='Ingrese todos los campos!!'
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  validateDecimal(control: AbstractControl) {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return { required: true }; // Indicar que el campo es obligatorio
    }

    const numericValue = Number(value);

    if (isNaN(numericValue) || numericValue < 0) {
      return { invalidDecimal: true, negativeValue: true }; // Indicar que el valor no es un número válido o es negativo
    }

    return null; // El valor es válido
  }

  validateNumero(control: AbstractControl) {
    const value = control.value;

    if (value === null || value === undefined) {
      return null; // Permitir valores nulos o indefinidos
    }

    // Convertir el valor a un número
    const numericValue = parseInt(value, 10);

    // Verificar si el valor es un número entero
    if (!Number.isInteger(numericValue)) {
      return { invalidInteger: true }; // Devolver un error si no es un número entero
    }

    // Verificar si el valor está en el rango del 1 al 100
    if (numericValue < 1) {
      return { outOfRange: true }; // Devolver un error si está fuera del rango
    }

    return null; // El valor es válido
  }

  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        Oncologo_id: new FormControl(data.oncologo_id),
        user_id: new FormControl(data.user_id.id),
        nombreyapellido_id: new FormControl(data.nombreyapellido),
        experiencia_laboral_anios: new FormControl(data.experiencia_laboral_anios),
        cantidad_pacientes: new FormControl(data.cantidad_pacientes),
        horario_atencion: new FormControl(data.horario_atencion),
        salario: new FormControl(data.salario),
        });
      });
    }
  }
}
