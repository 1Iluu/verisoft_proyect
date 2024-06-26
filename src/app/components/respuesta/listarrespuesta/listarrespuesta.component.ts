import { Component, OnInit, ViewChild } from '@angular/core';
import { Respuesta } from '../../../models/respuesta';
import { respuestaService } from '../../../services/respuesta.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  idRespuesta: number;
  gradoConsulta: string;
  nivelRespuesta: string;
  paciente: string;
}
@Component({
  selector: 'app-listarrespuesta',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule, 
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
   
  ],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent implements OnInit {
  
  displayedColumns: string[]=
  [
    'idRespuesta',
    'gradoConsulta',
    'nivelRespuesta',
    'paciente',
    'accion01',
    'accion02'
  ];

  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();
  constructor(private rS:respuestaService ){}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);


    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);


    });
}
  eliminar(id:number) {
    this.rS.delete(id).subscribe((data)=>{
      this.rS.list().subscribe((data)=> {
        this.rS.setList(data);
      });
    });
  }
}