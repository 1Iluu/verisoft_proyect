import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { Examendeteccion } from '../../../models/examendeteccion';
import { Serviceexamen } from '../../../services/serviceexamen.service';


@Component({
  selector: 'app-listarexamen',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './listarexamen.component.html',
  styleUrl: './listarexamen.component.css'
})
export class ListarexamenComponent implements OnInit { 
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'hora',
    'tipoExamen',
    'resultados',
    'accion01'
  ];

  dataSource:MatTableDataSource<Examendeteccion>=new MatTableDataSource();

  constructor(private eS:Serviceexamen
  ){}
  ngOnInit(): void {
    this.list();

  }

  list(){
    this.eS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
  });
  
  this.eS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
  });
  }
}