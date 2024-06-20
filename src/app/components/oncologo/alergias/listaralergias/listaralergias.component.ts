import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Alergias } from '../../../../models/alergias';
import { AlergiasService } from '../../../../services/alergias.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listaralergias',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule, 
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './listaralergias.component.html',
  styleUrl: './listaralergias.component.css'
})
export class ListaralergiasComponent implements OnInit{
  dataSource: MatTableDataSource<Alergias> = new MatTableDataSource();
  displayedColumns: string[]=
  [
    'id',
    'descripcion',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS:AlergiasService ){}
  ngOnInit(): void {
    this.aS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
    this.aS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
}
  eliminar(id:number) {
    this.aS.eliminar(id).subscribe((data)=>{
      this.aS.list().subscribe((data)=> {
        this.aS.setList(data);
      });
    });
  }
}