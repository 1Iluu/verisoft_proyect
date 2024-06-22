import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DetalleHistorial } from '../../../../models/detallehistorial';
import { ServiciodetallehistorialService } from '../../../../services/serviciodetallehistorial.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listardetallehistorial',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './listardetallehistorial.component.html',
  styleUrl: './listardetallehistorial.component.css'
})
export class ListardetallehistorialComponent implements OnInit {
  dataSource:MatTableDataSource<DetalleHistorial>=new MatTableDataSource();

  displayedColumns: string[] = [
    'idDetalleHistorial',
    'fechaDetalleHistorial',
    'seguro',
    'cirugias',
    'tratamiento',
    'examenDeteccion',
    'paciente',
  ];

  constructor(private dS:ServiciodetallehistorialService) {}
  ngOnInit(): void {
    this.list();
  }

  list(){
    this.dS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
  });
  
  this.dS.getList().subscribe((data) => {
    this.dataSource = new MatTableDataSource(data);
  });
  }
}
