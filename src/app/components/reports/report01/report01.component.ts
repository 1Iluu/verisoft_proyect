import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { AlergiasService } from '../../../services/alergias.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report01',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report01.component.html',
  styleUrl: './report01.component.css'
})
export class Report01Component implements OnInit{
  barChartOptions:ChartOptions={
    responsive: true,
  };
  barChartLabels:number [] = [];

 //barChartType: ChartType = 'pie';
 //barChartType: ChartType = 'doughnut';
 //barChartType: ChartType = 'line';
 barChartType: ChartType = 'bar';
 //barChartType: ChartType = 'polarArea';
bartChartLegend=true;
barChartData: ChartDataset[]=[];


  constructor(private aS:AlergiasService){}
  ngOnInit(): void {
    this.aS.getQuantity().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.id_paciente)
      this.barChartData=[
        {
          data:data.map(item=>item.quantityAlergias),
          label:'Cantidad de alergias',
          backgroundColor:['#8064A2','#4BACC6','#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth: 1,
        }
      ]
    })
      
  }

}
