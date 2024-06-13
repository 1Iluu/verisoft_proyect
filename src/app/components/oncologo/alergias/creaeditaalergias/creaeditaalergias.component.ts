import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Alergias } from '../../../../models/alergias';
import { AlergiasService } from '../../../../services/alergias.service';


@Component({
  selector: 'app-creaeditaalergias',
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
  templateUrl: './creaeditaalergias.component.html',
  styleUrl: './creaeditaalergias.component.css'
})
export class CreaeditaalergiasComponent implements OnInit {
    form: FormGroup = new FormGroup({});
    alergias: Alergias = new Alergias();
    mensaje: string = '';
    id: number = 0;
    edicion: boolean = false;
    
    
  
  
    constructor(
      private aS: AlergiasService,
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
        id: [''],
        descripcionAlergias: ['', Validators.required],
       });
       
  }
  
  aceptar(): void {
    if (this.form.valid) {
      this.alergias.idalergias = this.form.value.idalergias;
      this.alergias.descripcionAlergias = this.form.value.descripcionAlergias;
        
       
        this.aS.insert(this.alergias).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      
      this.router.navigate(['alergias']);
  }
  }

  init(){
    if(this.edicion){
      this.aS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          id:new FormControl(data.idalergias),
          descripcionAlergias: new FormControl(data.descripcionAlergias),
  
        });
      });
    }
  
  }
}
  
  
  
  
  