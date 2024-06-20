import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Seguro } from '../../../../models/seguro';
import { SeguroService } from '../../../../services/seguro.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


export interface PeriodicElement {
  codigo: number;
  Seguro: string;
  descripcion: string;
}


@Component({
  selector: 'app-listarseguros',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatButtonModule,MatIcon],
  templateUrl: './listarseguros.component.html',
  styleUrl: './listarseguros.component.css'
})
export class ListarsegurosComponent implements OnInit {
  displayedColumns: string[] = 
  [
  'codigo', 
  'seguro', 
  'descripcion',
  'accion01',
  'accion02'
  ];

  dataSource:MatTableDataSource<Seguro> = new MatTableDataSource()
  constructor(private sS:SeguroService ){}
  ngOnInit(): void {
    this.sS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  deletes(id:number){
    this.sS.delete(id).subscribe((data)=>{
      this.sS.list().subscribe((data)=>{
        this.sS.setList(data)
      })
    })
  }
}
