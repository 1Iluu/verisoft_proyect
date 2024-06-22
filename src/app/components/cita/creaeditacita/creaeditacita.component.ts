import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { Oncologo } from '../../../models/oncologo';
import { Paciente } from '../../../models/paciente';
import { OncologoService } from '../../../services/oncologo.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-creaeditacita',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './creaeditacita.component.html',
  styleUrl: './creaeditacita.component.css'
})
export class CreaeditacitaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cita: Cita = new Cita();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaOncologo : Oncologo[] = []
  listaPaciente : Paciente[] = []

  consultorio: { value: string; viewValue: string }[] = [
    { value: 'A1', viewValue: 'A1' },
    { value: 'B2', viewValue: 'B2' },
    { value: 'C3', viewValue: 'C3' },
    { value: 'D4', viewValue: 'D4' },
  ];

  constructor(
    private cS: CitaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private oS : OncologoService,
    private pS : PacienteService,
  ){}

ngOnInit(): void {
  this.route.params.subscribe((data:Params)=>{
    this.id=data[`id`];
    this.edicion=data[`id`]!=null;
    this.init()
  })

this.form = this.formBuilder.group({
  idCita: [''],
  fecha: ['', Validators.required],
  hora: ['', Validators.required],
  motivo: ['', Validators.required],
  estado: ['',Validators.required],
  consultorio: ['', Validators.required],
  paciente: ['', Validators.required],
  oncologo: ['', Validators.required],
});
this.oS.list().subscribe((data) => {
  this.listaOncologo = data;
});
this.pS.list().subscribe((data) => {
  this.listaPaciente = data;
});
}
aceptar(): void {
  if (this.form.valid) {
    this.cita.idCita = this.form.value.idCita;
    this.cita.consultorio = this.form.value.consultorio;
    this.cita.fecha = this.form.value.fecha;
    this.cita.estado = this.form.value.estado;
    this.cita.hora = this.form.value.hora;
    this.cita.motivo = this.form.value.motivo;
    this.cita.oncologo.oncologo_id = this.form.value.oncologo;
    this.cita.paciente.idPaciente = this.form.value.paciente;
    
if(this.edicion){
  this.cS.update(this.cita).subscribe((data)=>{
    this.cS.list().subscribe((data) => {
      this.cS.setList(data);
    });
  });

}else{
    this.cS.inser(this.cita).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
    this.router.navigate(['cita']);
  }
}
init(){
  if(this.edicion){
    this.cS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        idCita:new FormControl(data.idCita),
        consultorio:new FormControl(data.consultorio),
        fecha:new FormControl(data.fecha),
        estado:new FormControl(data.estado),
        hora:new FormControl(data.hora),
        motivo:new FormControl(data.motivo),
        oncologo:new FormControl(data.oncologo.oncologo_id),
        paciente:new FormControl(data.paciente.idPaciente),
      })
    })
  }
}
}

