import { Component, OnInit } from '@angular/core';
import { OncologoService } from '../../../services/oncologo.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-report-victor01',
  standalone: true,
  imports: [BaseChartDirective ,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    MatSelectModule],
  templateUrl: './report-victor01.component.html',
  styleUrl: './report-victor01.component.css'
})
export class ReportVictor01Component implements OnInit {
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
listaCitas: Cita[] = [];
form: FormGroup;
  constructor(private oS: OncologoService, private formBuilder: FormBuilder, private cS:CitaService) {
    this.form = formBuilder.group({
      Fecha: ['', 
        [
         Validators.required
        ]],
    })
  }
  ngOnInit(): void {
    // Initial data load can be added here if needed
    this.cS.list().subscribe((data) => {
      this.listaCitas = data;
    });
  }
  getQuantityCitas(): void {
    if (this.form.valid) {
      const Fecha = this.form.value.Fecha;
      this.oS.getQuantityCitas(Fecha).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.cantidadcitas.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadcitas),
            label: 'Cantidad de Citas',
            backgroundColor: [
              '#0094d3',
              '#4169c7',
              '#0000CD',
              '#9BBB59',
              '#8064A2',
              '#4BACC6',
              '#4F81BC',
              '#C0504D',
            ],
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ];
      });
    }
   }
  }