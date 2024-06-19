import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarherramientaComponent } from './listarherramienta/listarherramienta.component';

@Component({
  selector: 'app-herramienta',
  standalone: true,
  imports: [RouterOutlet,ListarherramientaComponent],
  templateUrl: './herramienta.component.html',
  styleUrl: './herramienta.component.css'
})
export class HerramientaComponent implements OnInit{
constructor(public route:ActivatedRoute){}
ngOnInit(): void {}
}
