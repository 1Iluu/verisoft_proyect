
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { Respuesta } from '../../../models/respuesta';
import { respuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-reportAbrigo02',
  standalone: true,
  imports: [BaseChartDirective,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './report-abrigo02.component.html',
  styleUrl: './report-abrigo02.component.css',
})

export class reportAbrigo02  implements OnInit {
   
  displayedColumns: string[]=
  [
    'idRespuesta',
    'gradoConsulta',
    'nivelRespuesta',
    'paciente',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();

  form:FormGroup=new FormGroup({});
  constructor(private rS: respuestaService,
    private formBuilder:FormBuilder) {
 
  }

  grados: { value: string, viewValue: string }[] = [{ value: 'leve', viewValue: 'Leve' },
  { value: 'moderado', viewValue: 'Moderado'},{value: 'grave', viewValue: 'Grave' }]
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      grado:['',Validators.required]
    });
  }

  insertar():void{
    if(this.form.valid){
      this.rS.getQuantityGrado(this.form.value.grado).subscribe(data => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
     
      });
      
      }
  }
}



