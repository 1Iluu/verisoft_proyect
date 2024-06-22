
import { Herramienta } from '../../../../models/herramienta';
import { ServicioherramientaService } from '../../../../services/servicioherramienta.service';
import { Oncologo } from '../../../../models/oncologo';
import { OncologoService } from '../../../../services/oncologo.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-creaeditaherramienta',
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
    RouterLink
  ],
  templateUrl: './creaeditaherramienta.component.html',
  styleUrl: './creaeditaherramienta.component.css'
})
export class CreaeditaherramientaComponent {
form:FormGroup=new FormGroup({});
herramienta:Herramienta=new Herramienta();
listaoncologos: Oncologo[] = [];
mensaje: string = '';
id: number = 0;
edicion: boolean = false;

listaHerramientas:{value:string; viewValue:string}[]=[
  {value:'Bisturí',viewValue:'Bisturí'},
  {value:'Tijeras Quirúrgicas',viewValue:'Tijeras Quirúrgicas'},
  {value:'Pinzas',viewValue:'Pinzas'},
  {value:'Ganchos y Separadores',viewValue:'Ganchos y Separadores'},
  {value:'Suturas y Grapadoras Quirúrgicas',viewValue:'Suturas y Grapadoras Quirúrgicas'},
  {value:'Electrocauterio',viewValue:'Electrocauterio'},
  {value:'Aspirador Quirúrgico',viewValue:'Aspirador Quirúrgico'},
  {value:'Ecografía',viewValue:'Ecografía'},
  {value:'Monitores de Signos Vitales',viewValue:'Monitores de Signos Vitales'},
  {value:'Endoscopio',viewValue:'Endoscopio'},
  {value:'Máquinas de Anestesia',viewValue:'Máquinas de Anestesia'},
  {value:'Agujas de Biopsia',viewValue:'Agujas de Biopsia'},
  {value:'Laser Quirúrgico',viewValue:'Laser Quirúrgico'},
  {value:'Máquina Gamma Knife',viewValue:'Máquina Gamma Knife'},
  {value:'Máquina CyberKnife',viewValue:'CyberKnife'},]

constructor(
  private formBuilber:FormBuilder,
  private hS:ServicioherramientaService,
  private router:Router,
  private route:ActivatedRoute,
  private oS:OncologoService
){}

ngOnInit(): void{
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

  this.form = this.formBuilber.group({
    codigo:[''],
    oncologo: ['', Validators.required],
    nombreHerramienta: ['', Validators.required],
 });
 this.oS.list().subscribe((data) => {
  this.listaoncologos = data;
});
}
guardar(): void{
if (this.form.valid) {
  this.herramienta.herramienta_id=this.form.value.codigo;
  this.herramienta.oncologo.oncologo_id=this.form.value.oncologo_id;
  this.herramienta.nombreHerramienta=this.form.value.nombreHerramienta;
  console.log(this.herramienta);
  
    if (this.edicion) {
      this.hS.update(this.herramienta).subscribe((data) => {
        this.hS.list().subscribe((data) => {
          this.hS.setList(data);
        });
      });
    } else {
      this.hS.insert(this.herramienta).subscribe((data) => {
        this.hS.list().subscribe((data) => {
          this.hS.setList(data);
        });
      });
    }
    this.router.navigate(['herramientas']);
    }
  }
  init() {
    if (this.edicion) {
      this.hS.listId(this.id).subscribe((data) => {
        this.form=new FormGroup({
          codigo:new FormControl(data.herramienta_id),
          oncologo: new FormControl(data.oncologo.oncologo_id),
          nombreHerramienta: new FormControl(data.nombreHerramienta),
        });
      });
    }
  }
}