import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';

import { Herramienta } from '../../../../models/herramienta';
import { ServicioherramientaService } from '../../../../services/servicioherramienta.service';

@Component({
  selector: 'app-listarherramienta',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './listarherramienta.component.html',
  styleUrl: './listarherramienta.component.css'
})
export class ListarherramientaComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo_herramienta',
    'codigo_oncologo',
    'nombreHerramienta',
    'accion01'
  ];

  dataSource:MatTableDataSource<Herramienta>=new MatTableDataSource();

  constructor(private hS:ServicioherramientaService
  ){}
  ngOnInit(): void {
    this.list();
  }

  list(){
    this.hS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
  });
  
  this.hS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
  });
  }
}
