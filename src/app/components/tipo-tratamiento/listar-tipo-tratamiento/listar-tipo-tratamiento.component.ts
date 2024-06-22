import { TipoTratamiento } from './../../../models/tipo_de_tratamiento';
import { TipoTratamientoService } from './../../../services/tipo-tratamiento.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-tipo-tratamiento',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './listar-tipo-tratamiento.component.html',
  styleUrls: ['./listar-tipo-tratamiento.component.css'],
})
export class ListarTipoTratamientoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombreTratamiento',
    'accion01',
    'accion02',
  ];

  dataSource: MatTableDataSource<TipoTratamiento> = new MatTableDataSource();

  constructor(
    private sS: TipoTratamientoService,
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
          'Primero elimine los tratamientos vinculados a este tipo de tratamiento',
          'Cerrar',
          {
            duration: 5000,
          }
        );
      },
    });
  }
}
