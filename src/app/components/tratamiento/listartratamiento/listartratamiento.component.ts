import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tratamiento } from '../../../models/tratamiento';
import { TratamientoService } from '../../../services/tratamiento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listartratamiento',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './listartratamiento.component.html',
  styleUrl: './listartratamiento.component.css',
})
export class ListartratamientoComponent {
  displayedColumns: string[] = [
    'idTratamiento',
    'descripcionTratamiento',
    'estadoTratamiento',
    'presupuestoTratamiento',
    'fechaTratamiento',
    'horasTratamiento',
    'efectosEsperadosTratamiento',
    'tipoTratamiento',
    'cita',
    'oncologo',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();

  constructor(private sS: TratamientoService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  deletes(id: number) {
    this.sS.delete(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
