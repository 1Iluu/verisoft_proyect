import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import { DetalleHistorial } from '../../../../models/detallehistorial';
import { ServiciodetallehistorialService } from '../../../../services/serviciodetallehistorial.service';

@Component({
  selector: 'app-listardetallehistorial',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './listardetallehistorial.component.html',
  styleUrl: './listardetallehistorial.component.css'
})
export class ListardetallehistorialComponent implements OnInit{
  displayedColumns: string[] = [
    'codigo',
    'fechaDetalleHistorial',
    'codigoseguro',
    'codigocirugia',
    'codigotratamiento',
    'codigoexamendeteccion',
    'codigopaciente',
  ];

  dataSource:MatTableDataSource<DetalleHistorial>=new MatTableDataSource();

  constructor(private dS:ServiciodetallehistorialService)  { }
ngOnInit(): void {
  this.dS.list().subscribe((data)=>{
    this.dataSource=new MatTableDataSource(data);
});

this.dS.getList().subscribe((data) => {
  this.dataSource = new MatTableDataSource(data);
});
}
}
