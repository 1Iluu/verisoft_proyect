import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { Herramienta } from '../../../../models/herramienta';
import { ServicioherramientaService } from '../../../../services/servicioherramienta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarherramienta',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatPaginatorModule,

  ],
  templateUrl: './listarherramienta.component.html',
  styleUrl: './listarherramienta.component.css'
})
export class ListarherramientaComponent implements OnInit {
  dataSource:MatTableDataSource<Herramienta>=new MatTableDataSource();

  displayedColumns: string[] = [
    'herramienta_id',
    'oncologo_id',
    'nombreHerramienta',
    'accion01',
    'accion02'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private hS:ServicioherramientaService) {}
  ngOnInit(): void {
      this.hS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
  });
  this.hS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
  }
  eliminar(id: number) {
    this.hS.eliminar(id).subscribe((data) => {
      this.hS.list().subscribe((data) => {
        this.hS.setList(data);
      });
    });
  }
}
