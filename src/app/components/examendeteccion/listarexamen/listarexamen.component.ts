import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Examendeteccion } from '../../../models/examendeteccion';
import { Serviceexamen } from '../../../services/serviceexamen.service';


@Component({
  selector: 'app-listarexamen',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './listarexamen.component.html',
  styleUrl: './listarexamen.component.css'
})
export class ListarexamenComponent implements OnInit { 
  dataSource: MatTableDataSource<Examendeteccion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'fecha',
    'hora',
    'tipoExamen',
    'resultados',
    'accion01'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private eS:Serviceexamen
  ){}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
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