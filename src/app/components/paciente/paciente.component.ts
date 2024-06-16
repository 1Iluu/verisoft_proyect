import { Component, OnInit } from '@angular/core';
import { RouterOutlet,ActivatedRoute } from '@angular/router';

import { ListaPacienteComponent } from './listarpaciente/listarpaciente.component';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterOutlet,ListaPacienteComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}