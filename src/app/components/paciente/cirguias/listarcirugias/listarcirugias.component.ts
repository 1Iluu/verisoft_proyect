import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cirugias } from '../../../../models/cirugias';
import { CirugiasService } from '../../../../services/cirugias.service';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  codigo: number;
  Cirugias: string;
  descripcionCirugias: string;
}
@Component({
  selector: 'app-listarcirugias',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './listarcirugias.component.html',
  styleUrl: './listarcirugias.component.css'
})
export class ListarcirugiasComponent implements OnInit{
  displayedColumns: string[]=
  [
    'idcirugias',
    'descripcionCirugias',
    'accion01',
    'accion02'
  ];
  dataSource: MatTableDataSource<Cirugias>= new MatTableDataSource();


  constructor(private cS:CirugiasService ){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);

    });
    this.cS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);

    });
}
 deletes(id:number) {
  this.cS.delete(id).subscribe((data) => {
    this.cS.list().subscribe((data)=>{
      this.cS.setList(data);
    });
  });
 }
}