import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CitaService } from '../../../services/cita.service';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-report-cardenas1',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-cardenas1.component.html',
  styleUrl: './report-cardenas1.component.css'
})
export class ReportCardenas1Component implements OnInit{ 
  barChartOptions: ChartOptions = {
    responsive: true,
  };

barChartLabels: string[] = [];

 //barChartType: ChartType = 'pie';

 barChartType: ChartType = 'doughnut';

 //barChartType: ChartType = 'line';

 //barChartType: ChartType = 'bar';

 //barChartType: ChartType = 'polarArea';
barChartLegend = true;
barChartData: ChartDataset[] = [];
 constructor(private cs:CitaService){}
  ngOnInit(): void {
    this.cs.getQuantity().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nameOnco)
      this.barChartData=[
        {
          data:data.map(item=>item.quantityCita),
          label:'cantidad citas',
          backgroundColor:['#8064A2',  '#4169c7',],
          borderColor:'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
      ]
    })


  }

}
