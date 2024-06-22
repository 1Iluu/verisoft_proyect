import { Component, OnInit } from '@angular/core';
import { CirugiasService } from '../../../services/cirugias.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report02',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report02.component.html',
  styleUrl: './report02.component.css'
})
export class Report02Component implements OnInit{
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


  constructor(private cS:CirugiasService){}
  ngOnInit(): void {
    this.cS.getQuantity().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.id_paciente)
      this.barChartData=[
        {
          data:data.map(item=>item.quantityCirugias),
          label:'Cantidad de cirugias',
          backgroundColor:['#8064A2','#4BACC6','#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth: 1,
        }
      ]
    })

  }

}
