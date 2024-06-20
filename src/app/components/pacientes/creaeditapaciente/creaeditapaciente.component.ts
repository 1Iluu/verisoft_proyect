import { CommonModule } from '@angular/common';
import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../models/users';


@Component({
  selector: 'app-creaeditapaciente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditapaciente.component.html',
  styleUrl: './creaeditapaciente.component.css'
})
export class creaeditapaciente implements OnInit{
  form: FormGroup = new FormGroup({});
  id:number =0;
  paciente:Paciente= new Paciente
  edicion:boolean=false;
  listaUsers: Users[] = [];
  idUserSeleccionado:number=0

 
  constructor(
    private formBuilber: FormBuilder,
    private pS: PacienteService,
    private router: Router,
    private route:ActivatedRoute,
    private uS: UsersService,

  ) {}

  ngOnInit(): void {
  
    this.route.params.subscribe((data:Params)=>{
      this.id=data[`id`];
      this.edicion=data[`id`]!=null;
      this.init()
    })

    this.form = this.formBuilber.group({
      idPaciente: ['',],
      user_id: ['', Validators.required],
      contactoEmergencia:['', Validators.required],
      estado:['', Validators.required],
      
    });
    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.paciente.idPaciente = this.form.value.idPaciente;
      this.paciente.contactoEmergencia = this.form.value.contactoEmergencia;
      this.paciente.estado= this.form.value.estado;
      this.paciente.user_id.id = this.form.value.user_id;

      if (this.edicion) {
        this.pS.update(this.paciente).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }else{


       this.pS.inser(this.paciente).subscribe((data) => {
       this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
     });
    }
    this.router.navigate(['pacientes']);
  }
}
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  
}

init(){
  if(this.edicion){
    this.pS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        idPaciente:new FormControl(data.idPaciente),
        contactoEmergencia:new FormControl(data.contactoEmergencia),
        estado:new FormControl(data.estado),
        user_id: new FormControl(data.user_id.id),

      })
    })
  }
}
}


