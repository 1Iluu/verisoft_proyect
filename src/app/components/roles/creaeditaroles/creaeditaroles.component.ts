import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from '../../../models/roles';
import { Users } from '../../../models/users';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  imports: [  MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './creaeditaroles.component.html',
  styleUrl: './creaeditaroles.component.css'
})
export class CreaeditarolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  roles: Roles = new Roles();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  tipos: { value: string; viewValue: string }[] = [
    { value: 'USER', viewValue: 'User' },
    { value: 'ONCOLOGO', viewValue: 'Oncologo' }
  ];
  listaUsers: Users[] = [];
  idUserSeleccionado:number=0
  constructor(
    private rS: RolesService,
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
      id: ['',],
      rol: ['', Validators.required],
      user: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.roles.id = this.form.value.id;
      this.roles.rol = this.form.value.rol;
      this.roles.user.id = this.form.value.user;
      if(this.edicion){
        this.rS.update(this.roles).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          })
        })
      } else {
        this.rS.insert(this.roles).subscribe(data=>{
          this.rS.list().subscribe(data=>{
            this.rS.setList(data);
          })
        });
      }
      this.router.navigate(['/components/roles'])
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

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) =>
      {this.form = new FormGroup({
        id: new FormControl(data.id),
        rol: new FormControl(data.rol),
        user: new FormControl(data.user.id),
        });
      });
    }
  }
}
