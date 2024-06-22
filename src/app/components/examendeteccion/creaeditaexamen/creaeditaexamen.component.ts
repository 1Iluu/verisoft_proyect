import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Examendeteccion } from '../../../models/examendeteccion';
import { Server } from 'http';
import { Serviceexamen } from '../../../services/serviceexamen.service';


@Component({
  selector: 'app-creaeditaexamen',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
     MatSelectModule,
     CommonModule,
     MatInputModule,
     MatButtonModule,
     MatDatepickerModule],

  providers: [provideNativeDateAdapter()],
  templateUrl: './creaeditaexamen.component.html',
  styleUrl: './creaeditaexamen.component.css',
})

export class CreaeditaexamenComponent implements OnInit {
form: FormGroup=new FormGroup({});
service: Examendeteccion=new Examendeteccion();
id:number=0;
edicion:boolean=false

listaTipoExamenes: {value: String; viewValue: string }[] = [
  {value:'Mamografía', viewValue: 'Mamografía'},
  {value:'Radiografía', viewValue: 'Radiografía'},
  {value:'Tomografía', viewValue: 'Tomografía'},
  {value:'Endoscopia', viewValue: 'Endoscopia'},
  {value:'Resonancia Magnética',viewValue: 'Resonancia Magnética'},
  {value:'Colonoscopia', viewValue: 'Colonoscopia'},
  {value:'Biopsia', viewValue: 'Biopsia'},
  {value:'Análisis de Sangre', viewValue: 'Análisis de Sangre'},];

constructor(
  private formBuilber:FormBuilder,
  private eS:Serviceexamen,
  private router:Router,
  private route:ActivatedRoute
){}

ngOnInit(): void{

  this.route.params.subscribe((data:Params)=>{
  this.id=data['id'];
  this.edicion=data['id']!=null;
  this.init()
  })

  this.form=this.formBuilber.group({
    codigo:[''],
    fecha:['', Validators.required],
    hora: ['',Validators.required],
    tipoExamen: ['', Validators.required],
    resultados:['',Validators.required],
  });
}

guardar(): void {
  if (this.form.valid) {
    this.service.examenDeteccionId=this.form.value.codigo;
    this.service.fecha=this.form.value.fecha;
    this.service.hora=this.form.value.hora;
    this.service.tipoExamen=this.form.value.tipoExamen;
    this.service.resultados=this.form.value.resultados;
    console.log(this.service);
    if(this.edicion){
      this.eS.update(this.service).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });
    }else{
    this.eS.insert(this.service).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
     this.router.navigate(['examenes']);
  }
}

init(){
  if(this.edicion){
    this.eS.ListId(this.id).subscribe((data) => {
      this.form=new FormGroup({
        codigo:new FormControl(data.examenDeteccionId),
        fecha:new FormControl(data.fecha),
        hora:new FormControl(data.hora),
        tipoExamen:new FormControl(data.tipoExamen),
        resultados:new FormControl(data.resultados),
          });
      });
   }
  }
}
