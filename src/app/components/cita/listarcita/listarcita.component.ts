import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-listarcita',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './listarcita.component.html',
  styleUrl: './listarcita.component.css'
})
export class ListarcitaComponent implements OnInit{
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5','c6','c7','c8','c9','c10'];


  constructor(private cS: CitaService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      
    });
  }
    eliminar(id: number) {
      this.cS.delete(id).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
    }
  }

