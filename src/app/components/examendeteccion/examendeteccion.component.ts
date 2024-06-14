import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarexamenComponent } from './listarexamen/listarexamen.component';

@Component({
  selector: 'app-examendeteccion',
  standalone: true,
  imports: [
    RouterOutlet,ListarexamenComponent],
  templateUrl: './examendeteccion.component.html',
  styleUrl: './examendeteccion.component.css'
})
export class ExamendeteccionComponent implements OnInit{
constructor(public route:ActivatedRoute) {}
ngOnInit(): void{}
}
