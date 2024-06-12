import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CirugiasService } from '../../../services/cirugias.service';
import { Cirugias } from '../../../models/cirugias';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


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
    MatInputModule
  ],
  templateUrl: './listarcirugias.component.html',
  styleUrl: './listarcirugias.component.css'
})
export class ListarcirugiasComponent implements OnInit{
  dataSource: MatTableDataSource<Cirugias>= new MatTableDataSource();
  displayedColumns: string[]=
  [
    'idcirugias',
    'descripcionCirugias',
    'accion01',
    'accion02'
  ];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private cS:CirugiasService ){}
  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
    });
    this.cS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator= this.paginator;
    });
}
 eliminar(id:number) {
  this.cS.eliminar(id).subscribe((data) => {
    this.cS.list().subscribe((data)=>{
      this.cS.setList(data);
    });
  });
 }
}