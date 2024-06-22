import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { TratamientoService } from '../../../services/tratamiento.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { estadosPaciente } from '../../../consts/consts';

@Component({
  selector: 'app-report-tratamiento',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './report-tratamiento.component.html',
  styleUrl: './report-tratamiento.component.css'
})
export class ReportTratamientoComponent {
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  pieChartLabels: string[] = estadosPaciente.map((item) => item.viewValue);
  pieChartDatasets: ChartDataset<'pie'>[] = [];
  pieChartLegend = true;

  hasData = true;

  constructor(private tratamientoService: TratamientoService) {}

  ngOnInit(): void {
    this.tratamientoService.list().subscribe((data) => {
      const dataset = estadosPaciente.map(
        (item) => data.filter((d) => d.estadoTratamiento === item.value).length
      );

      if (dataset.every((item) => item === 0)) {
        this.hasData = false;
      }

      this.pieChartDatasets = [
        {
          data: dataset,
        },
      ];
    });
  }
}
