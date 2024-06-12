import { TipoTratamiento } from './../../../models/tipo_de_tratamiento';
import { TipoTratamientoService } from './../../../services/tipo-tratamiento.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-tipo-tratamiento',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './listar-tipo-tratamiento.component.html',
  styleUrls: ['./listar-tipo-tratamiento.component.css']
})
export class ListarTipoTratamientoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombreTratamiento',
    'accion02'
  ];

  dataSource: MatTableDataSource<TipoTratamiento> = new MatTableDataSource();

  constructor(private sS: TipoTratamientoService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
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
