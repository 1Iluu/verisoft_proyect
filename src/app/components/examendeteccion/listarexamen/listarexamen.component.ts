import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { ExamendeteccionService } from '../../../services/examendeteccion.service';
import { Examendeteccion } from '../../../models/examendeteccion';


@Component({
  selector: 'app-listarexamen',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
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
    'Resultados'
  ];

  dataSource:MatTableDataSource<Examendeteccion>=new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) Paginator!: MatPaginator;

  constructor(private eS:ExamendeteccionService
  ){}
  ngOnInit(): void {
    this.list();

  }

  list(){
    this.eS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.Paginator;
  });
  
  this.eS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.Paginator;
  });
  }
}

