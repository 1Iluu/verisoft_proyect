import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Oncologo } from '../../../models/oncologo';
import { OncologoService } from '../../../services/oncologo.service';

@Component({
  selector: 'app-listaroncologo',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule, 
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './listaroncologo.component.html',
  styleUrl: './listaroncologo.component.css'
})
export class ListaroncologoComponent implements OnInit{
  dataSource: MatTableDataSource<Oncologo>=new MatTableDataSource();
  displayedColumns: String[]=['codigo',
  'usuario',
  'especialidad',
  'anios',
  'educacion',
  'cantidad',
  'horario',
  'salario',
  'nombreyapellido',
  'accion01',
  'accion02',
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private oS: OncologoService) {}
    ngOnInit(): void {
      this.oS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      this.oS.getList().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) =>{
        this.oS.setList(data);
      });
    });
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}
