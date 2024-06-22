import { EspecialidadService } from './../../../services/especialidad.service';
import { Especialidad } from './../../../models/especialidad';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-especialidad',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatButtonModule],
  templateUrl: './listar-especialidad.component.html',
  styleUrl: './listar-especialidad.component.css',
})
export class ListarEspecialidadComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombreEspecialidad',
    'complejidad',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<Especialidad> = new MatTableDataSource();

  constructor(
    private sS: EspecialidadService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  deletes(id: number) {
    this.sS.delete(id).subscribe({
      next: (data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      },
      error: (error) => {
        this._snackbar.open(
          'Primero elimine los oncologos vinculados a esta especialidad',
          'Cerrar',
          {
            duration: 5000,
          }
        );
      },
    });
  }
}
