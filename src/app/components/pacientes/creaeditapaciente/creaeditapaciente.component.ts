import { CommonModule } from '@angular/common';
import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
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
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';


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
  

 
  constructor(
    private formBuilber: FormBuilder,
    private pS: PacienteService,
    private router: Router,
    private route:ActivatedRoute,

  ) {}

  ngOnInit(): void {
  
    this.route.params.subscribe((data:Params)=>{
      this.id=data[`id`];
      this.edicion=data[`id`]!=null;
      this.init()
    })

    this.form = this.formBuilber.group({
      idPaciente: ['',],
      user: ['', Validators.required],
      contactoEmergencia:['', Validators.required],
      estado:['', Validators.required],
      
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.paciente.idPaciente = this.form.value.idPaciente;
      this.paciente.user = this.form.value.user;
      this.paciente.contactoEmergencia = this.form.value.contactoEmergencia;
      this.paciente.estado= this.form.value.estado;
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

init(){
  if(this.edicion){
    this.pS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        idPaciente:new FormControl(data.idPaciente),
        user:new FormControl(data.user),
        contactoEmergencia:new FormControl(data.contactoEmergencia),
        estado:new FormControl(data.estado),
      })
    })
  }
}
}


