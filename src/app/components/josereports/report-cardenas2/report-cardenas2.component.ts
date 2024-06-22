import { Component, OnInit } from '@angular/core';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-report-cardenas2',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,FormsModule,MatTableModule,MatButton],
  templateUrl: './report-cardenas2.component.html',
  styleUrl: './report-cardenas2.component.css'
})
export class ReportCardenas2Component implements OnInit{
   citas:Cita[] = []
   oncologo: string = '';
   displayedColumns: string[] = 
  [
  'fecha', 
  'hora', 
  'motivo',
  ];

  dataSource:MatTableDataSource<Cita> = new MatTableDataSource()
   constructor(private citaService: CitaService) { }


  ngOnInit(): void {
    
   
  }

  getCitas(): void {
    this.citaService.getCitasPorNombre(this.oncologo).subscribe(
      data => {
        this.citas = data;
        this.dataSource = new MatTableDataSource(this.citas); // Actualizar dataSource
      },
      error => console.error('Error fetching citas', error)
    );
  }
  }
