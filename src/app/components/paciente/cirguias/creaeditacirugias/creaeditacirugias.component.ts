import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Cirugias } from '../../../../models/cirugias';
import { CirugiasService } from '../../../../services/cirugias.service';


@Component({
  selector: 'app-creaeditacirugias',
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
  templateUrl: './creaeditacirugias.component.html',
  styleUrl: './creaeditacirugias.component.css'
})
export class CreaeditacirugiasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cirugias: Cirugias = new Cirugias();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false
  
  


  constructor(
    private cS: CirugiasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
    
  ){} 
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      this.init()

    })
     this.form = this.formBuilder.group({
      idcirugias: [''],
      descripcionCirugias: ['', Validators.required],
     });
     
}

aceptar(): void {
  if (this.form.valid) {
    this.cirugias.idcirugias = this.form.value.idcirugias,
    this.cirugias.descripcionCirugias = this.form.value.descripcionCirugias;
      
    
      this.cS.insert(this.cirugias).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
    
    this.router.navigate(['cirugias']);
}
}
init(){
  if(this.edicion){
    this.cS.listId(this.id).subscribe((data)=>{
      this.form=new FormGroup({
        id:new FormControl(data.idcirugias),
        descripcionCirugias: new FormControl(data.descripcionCirugias),

      })
    })
  }

}

}


