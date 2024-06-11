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
import { SeguroService } from '../../../../services/seguro.service';
import { Seguro } from '../../../../models/seguro';
@Component({
  selector: 'app-crearseguro',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './crearseguro.component.html',
  styleUrl: './crearseguro.component.css'
})
export class CrearseguroComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  seguro: Seguro = new Seguro();
  id:number =0;
  edicion:boolean=false;

  listaTipos: { value: string; viewValue: string }[] = [
    { value: 'Privado', viewValue: 'Privado' },
    { value: 'Oncologico', viewValue: 'Oncologico' },
    { value: 'Eps', viewValue: 'Eps' },
    { value: 'EsSalud', viewValue: 'EsSalud' },
  ];
  constructor(
    private formBuilber: FormBuilder,
    private sS: SeguroService,
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
      codigo: ['',],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.seguro.idseguro = this.form.value.codigo;
      this.seguro.nombreseguro = this.form.value.nombre;
      this.seguro.tiposeguro = this.form.value.tipo;
      if (this.edicion) {
        this.sS.update(this.seguro).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }else{


       this.sS.inser(this.seguro).subscribe((data) => {
       this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
     });
    }
    this.router.navigate(['seguros']);
  }
}

init(){
  if(this.edicion){
    this.sS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        codigo:new FormControl(data.idseguro),
        nombre:new FormControl(data.nombreseguro),
        tipo:new FormControl(data.tiposeguro),
      })
    })
  }
}
}


