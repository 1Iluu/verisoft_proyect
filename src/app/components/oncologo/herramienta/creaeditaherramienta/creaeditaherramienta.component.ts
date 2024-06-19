import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Herramienta } from '../../../../models/herramienta';
import { ServicioherramientaService } from '../../../../services/servicioherramienta.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditaherramienta',
  standalone: true,
  imports: [
    MatFormFieldModule,
     ReactiveFormsModule,
     MatSelectModule,
     CommonModule,
     MatInputModule,
     MatButtonModule,
  ],
  templateUrl: './creaeditaherramienta.component.html',
  styleUrl: './creaeditaherramienta.component.css'
})
export class CreaeditaherramientaComponent implements OnInit{
form:FormGroup=new FormGroup({});
service:Herramienta=new Herramienta();
id:number=0;
edicion:boolean=false

listaHerramientas:{value:string; viewValue:string}[]=[
  {value:'Bisturí',viewValue:'Bisturí'},
  {value:'Tijeras Quirúrgicas',viewValue:'Tijeras Quirúrgicas'},
  {value:'Pinzas',viewValue:'Pinzas'},
  {value:'Ganchos y Separadores',viewValue:'Ganchos y Separadores'},
  {value:'Suturas y Grapadoras Quirúrgicas',viewValue:'Suturas y Grapadoras Quirúrgicas:'},
  {value:'Electrocauterio',viewValue:'Electrocauterio'},
  {value:'Aspirador Quirúrgico',viewValue:'Aspirador Quirúrgico'},
  {value:'Ecografía',viewValue:'Ecografía'},
  {value:'Monitores de Signos Vitales',viewValue:'Monitores de Signos Vitales'},
  {value:'Endoscopio',viewValue:'Endoscopio'},
  {value:'Máquinas de Anestesia',viewValue:'Máquinas de Anestesia'},
  {value:'Agujas de Biopsia',viewValue:'Agujas de Biopsia'},
  {value:'Laser Quirúrgico',viewValue:'Laser Quirúrgico'},
  {value:'Máquina Gamma Knife',viewValue:'Máquina Gamma Knife'},
  {value:'Máquina CyberKnife',viewValue:'CyberKnife'}
];

constructor(
  private formBuilber:FormBuilder,
  private hS:ServicioherramientaService,
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
    codigo_herramienta: ['',Validators.required],

    codigo_oncologo: ['', Validators.required],

    nombreHerramienta:['',Validators.required],
})
}

guardar(): void{
if (this.form.valid) {
  this.service.herramienta_id=this.form.value.codigo_herramienta;
  this.service.oncologo.oncologo_id=this.form.value.oncologo.codigo_oncologo;
  this.service.nombreHerramienta=this.form.value.nombreHerramienta;
  console.log(this.service);

  if(this.edicion){
    this.hS.update(this.service).subscribe((data) => {
      this.hS.list().subscribe((data) => {
        this.hS.setList(data);
      });
    });
  }else{

    this.hS.insert(this.service).subscribe((data) => {
      this.hS.list().subscribe((data) => {
        this.hS.setList(data);
      });
    });
    this.router.navigate(['herramientas']);
  };
 }
}

init(){
  if(this.edicion){
    this.hS.ListId(this.id).subscribe((data) => {
      this.form=new FormGroup({
        codigo_herramienta:new FormControl(data.herramienta_id),
        codigo_oncologo:new FormControl(data.oncologo.oncologo_id),
        nombreHerramienta:new FormControl(data.nombreHerramienta),
      });
    })
  }
}
}