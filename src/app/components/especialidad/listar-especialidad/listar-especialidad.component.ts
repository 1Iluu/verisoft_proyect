import { EspecialidadService } from './../../../services/especialidad.service';
import { Especialidad } from './../../../models/especialidad';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-listar-especialidad',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatButtonModule],
  templateUrl: './listar-especialidad.component.html',
  styleUrl: './listar-especialidad.component.css'
})
export class ListarEspecialidadComponent implements OnInit {
  displayedColumns: string[] =
  [
  'id',
  'nombreEspecialidad',
  'complejidad',
  'accion01',
  'accion02'
  ];

  dataSource:MatTableDataSource<Especialidad> = new MatTableDataSource()

  constructor(private sS:EspecialidadService ){}

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
