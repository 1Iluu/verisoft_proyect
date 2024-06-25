import { Component, OnInit, ViewChild } from '@angular/core';
import { respuestaService } from '../../../services/respuesta.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Respuesta } from '../../../models/respuesta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-report01',
  standalone: true,
  imports: [
    MatFormFieldModule,
    BaseChartDirective,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],

  templateUrl: './report01.component.html',
  styleUrl: './report01.component.css'
})
export class Report01Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabel:string[] = [];
  barChartType:ChartType = 'bar'
  barChartLegend=true;
  barChartData:ChartDataset[] = [];
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'polarArea';

  form:FormGroup=new FormGroup({});
  displayedColumns: string[]=
  [
    'idRespuesta',
    'nivelRespuesta',
    'paciente',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();
 
  constructor(private rS: respuestaService,
    private formBuilder:FormBuilder) {
  }

  tipos: { value: string, viewValue: string }[] = [{ value: 'activo', viewValue: 'Activo' },
  { value: 'inactivo', viewValue: 'Inactivo' }]
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      estado:['',Validators.required]
    });
  }

  insertar():void{
    if(this.form.valid){
      this.rS.getQuantity(this.form.value.estado).subscribe(data => {
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.barChartLabel = data.map(item => "Cantidad");
      this.barChartData = [{
        data: data.map(item => data.length),
        label:'Respuestas por Estado',
        backgroundColor: ['#DCDCB8'],
        barThickness:150
      }] 
      });
      
      }
  }

}