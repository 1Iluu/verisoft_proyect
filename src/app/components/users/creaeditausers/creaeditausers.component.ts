import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-creaeditausers',
  standalone: true,
  imports: [  MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatCardModule],
  templateUrl: './creaeditausers.component.html',
  styleUrl: './creaeditausers.component.css'
})
export class CreaeditausersComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  users:Users = new Users();
  mensaje:string = "";
  fecha_nacimiento = new FormControl(new Date());
  id: number = 0;
  edicion: boolean = false;
  maxFecha: Date = moment().add(-1, 'days').toDate();
  generos: { value: string; viewValue: string }[] = [
    { value: 'F', viewValue: 'Femenino' },
    { value: 'M', viewValue: 'Masculino' },]
  habilitado: { value: boolean; viewValue: string}[] = [
    { value: true, viewValue: 'Enabled' },
    { value: false, viewValue: 'Disabled' }
  ]
  paises: { value: string; viewValue: string }[] = [
    { value: 'Peru', viewValue: 'Peru' },
    { value: 'Uruguay', viewValue: 'Uruguay' },
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'Brasil', viewValue: 'Brasil' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
    { value: 'Bolivia', viewValue: 'Bolivia' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
    { value: 'Mexico', viewValue: 'Mexico' },
    { value: 'Estados Unidos', viewValue: 'USA' },
    { value: 'España', viewValue: 'España'}
  ]

  constructor(private uS:UsersService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

    this.form=this.formBuilder.group({
      id: ['',],
      username:['',[Validators.required, Validators.maxLength(30)]],
      password:['',[Validators.required, Validators.maxLength(200)]],
      enabled:['',Validators.required],
      nombre:['',[Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellido:['',[Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]],
      genero:['',Validators.required],
      fecha_nacimiento:['',Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(9)]], // solo números, máximo 10 caracteres
      correo_electronico: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(10)]], // solo números
      pais_de_origen:['',[Validators.required, Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }

  aceptar():void{
    if(this.form.valid){
      this.users.id = this.form.value.id;
      this.users.username = this.form.value.username;
      this.users.password = this.form.value.password;
      this.users.enabled = this.form.value.enabled;
      this.users.nombre = this.form.value.nombre;
      this.users.apellido = this.form.value.apellido;
      this.users.genero = this.form.value.genero;
      this.users.fecha_nacimiento = this.form.value.fecha_nacimiento;
      this.users.dni = this.form.value.dni;
      this.users.correo_electronico = this.form.value.correo_electronico;
      this.users.telefono = this.form.value.telefono;
      this.users.pais_de_origen = this.form.value.pais_de_origen;
      this.users.direccion = this.form.value.direccion;
      if(this.edicion){
        this.uS.update(this.users).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          })
        })
      } else {
        this.uS.insert(this.users).subscribe(data=>{
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          })
        });
      }
      this.router.navigate(['users']);
    }
    else {
      this.mensaje = 'Complete todos los campos, revise!!'
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        id: new FormControl(data.id),
        username: new FormControl(data.username),
        password: new FormControl(data.password),
        enabled: new FormControl(data.enabled),
        nombre: new FormControl(data.nombre),
        apellido: new FormControl(data.apellido),
        genero: new FormControl(data.genero),
        fecha_nacimiento: new FormControl(data.fecha_nacimiento),
        dni: new FormControl(data.dni),
        correo_electronico: new FormControl(data.correo_electronico),
        telefono: new FormControl(data.telefono),
        pais_de_origen: new FormControl(data.pais_de_origen),
        direccion: new FormControl(data.direccion),
        });
      });
    }
  }

}
