import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { OncologoService } from '../../../services/oncologo.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report-victor02',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report-victor02.component.html',
  styleUrl: './report-victor02.component.css'
})
export class ReportVictor02Component  implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private oS: OncologoService) {}
  ngOnInit(): void {
    this.oS.getPromedioEstrellas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nombreyapellido);
      this.barChartData=[
        {
          data:data.map(item=>item.promedioestrellas),label:' Promedio Estrellas Obtenidas',
          backgroundColor:'rgba(255,0,0,0.5)'
        }
      ]
    });
  }
}