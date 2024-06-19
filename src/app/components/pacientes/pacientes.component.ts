import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ListaPacienteComponent } from './listarpaciente/listarpaciente.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [RouterOutlet,ListaPacienteComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}

