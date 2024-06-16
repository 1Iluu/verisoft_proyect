import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Respuesta } from '../../../models/respuesta';
import { respuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-creaeditarespuesta',
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
    MatFormFieldModule,
  ],
  templateUrl: './creaeditarespuesta.component.html',
  styleUrl: './creaeditarespuesta.component.css'
})
export class CreaeditarespuestaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
    respuesta: Respuesta = new Respuesta();
    mensaje: string = '';
    id: number = 0;
    edicion: boolean = false;
    
    
  
  
    constructor(
      private rS: respuestaService,
      private router: Router,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      
    ){} 
    ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id'];
        this.edicion=data['id']!=null;
        this.init()
      });


       this.form = this.formBuilder.group({
        idRespuesta: [''],
        gradoConsulta: ['', Validators.required],
        nivelRespuesta: ['', Validators.required],
        paciente: ['', Validators.required]
       });
       
  }
  
  aceptar(): void {
    if (this.form.valid) {
      this.respuesta.idRespuesta = this.form.value.idRespuesta;
      this.respuesta.gradoConsulta = this.form.value.gradoConsulta;
      this.respuesta.nivelRespuesta = this.form.value.nivelRespuesta;
      this.respuesta.paciente = this.form.value.paciente;
      
      if(this.edicion){
        this.rS.update(this.respuesta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }else{
        this.rS.inser(this.respuesta).subscribe((data)=> {
          this.rS.list().subscribe((data)=>{
            this.rS.setList(data);
          });
        });
      this.router.navigate(['respuestas']);
  }
  }
}

  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          id:new FormControl(data.idRespuesta),
          gradoConsulta: new FormControl(data.gradoConsulta),
          nivelRespuesta: new FormControl(data.nivelRespuesta),
          paciente: new FormControl(data.paciente),
  
        });
      });
    }
  
  }
}
  

