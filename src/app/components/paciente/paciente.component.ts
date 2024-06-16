import { Component, OnInit } from '@angular/core';
import { RouterOutlet,ActivatedRoute } from '@angular/router';
import { ListarcirugiasComponent } from './cirguias/listarcirugias/listarcirugias.component';
import { ListarsegurosComponent } from './seguro/listarseguros/listarseguros.component';


@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [RouterOutlet,ListarcirugiasComponent,ListarsegurosComponent],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}