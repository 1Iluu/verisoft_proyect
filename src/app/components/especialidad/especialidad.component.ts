import { ListarEspecialidadComponent } from './listar-especialidad/listar-especialidad.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, } from '@angular/router';
@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
