import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { ExamendeteccionService } from '../../../services/examendeteccion.service';
import { MatButtonModule } from '@angular/material/button';
import { Examendeteccion } from '../../../models/examendeteccion';


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


listaTipoExamenes:{value:String;viewValue:string}[]=[
  {value:'Mamografía', viewValue: 'Mamografía'},
  {value:'Radiografía', viewValue: 'Radiografía'},
  {value:'Tomografía', viewValue: 'Tomografía'},
  {value:'Endoscopia', viewValue: 'Endoscopia'},
  {value:'Resonancia Magnética',viewValue: 'Resonancia Magnética'},
  {value:'Colonoscopia', viewValue: 'Colonoscopia'},
  {value:'Biopsia', viewValue: 'Biopsia'},
  {value:'Análisis de Sangre', viewValue: 'Análisis de Sangre'},
];

constructor(
  private formBuilber:FormBuilder,
  private eS:ExamendeteccionService,
  private router:Router
){}

ngOnInit(): void{
  this.form=this.formBuilber.group({
    Fecha:['',[
    Validators.required,
    this.fechaValidar()
    ]],
    hora: ['',Validators.required],

    tipoExamen: ['', Validators.required],

    resultados:['',Validators.required],
})
}

guardar(): void {
  if (this.form.valid) {
    this.service.fecha=this.form.value.Fecha;
    this.service.hora=this.form.value.hora;
    this.service.tipoExamen=this.form.value.tipoExamen;
    this.service.resultados=this.form.value.resultados;
    console.log(this.service);
    this.eS.insert(this.service).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
     this.router.navigate(['examenes']);
    });
  }
}

fechaValidar() {
  return (control: { value: string; }) => {
    const FechaControl = new Date(control.value);

    if (FechaControl > new Date()) {
      return { fechaExamenVal: true };
    }else{
      return null;
    }
  };
}

}
