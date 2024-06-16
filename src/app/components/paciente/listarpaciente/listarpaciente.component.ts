import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PacienteService } from '../../../services/paciente.service';
import { Pacient } from '../../../models/paciente';
import { Users } from '../../../models/users';


export interface PeriodicElement {
    idPaciente: number;
    user: Users;
    contactoEmergencia:string;
    estado:string;
  }


@Component({
  selector: 'app-listarpacientes',
  standalone: true,
  imports: [MatTableModule,RouterLink,MatButtonModule],
  templateUrl: `./listarpaciente.component.html`,
  styleUrl: './listarpaciente.component.css'
})
export class ListaPacienteComponent implements OnInit {
  displayedColumns: string[] = 
  [
  'idPaciente',
  'user', 
  'contactoEmergencia', 
  'estado',
  'accion01',
  'accion02'
  ];

  dataSource:MatTableDataSource<Pacient> = new MatTableDataSource()
  constructor(private pS:PacienteService ){}
  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.pS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  deletes(id:number){
    this.pS.delete(id).subscribe((data)=>{
      this.pS.list().subscribe((data)=>{
        this.pS.setList(data)
      })
    })
  }
}
