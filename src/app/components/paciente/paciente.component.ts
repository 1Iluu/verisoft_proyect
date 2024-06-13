import { Component, OnInit } from '@angular/core';
import { RouterOutlet,ActivatedRoute } from '@angular/router';
import { ListarsegurosComponent } from './seguro/listarseguros/listarseguros.component';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterOutlet,ListarsegurosComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}