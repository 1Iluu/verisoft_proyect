import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetallehistorialComponent } from './listardetallehistorial/listardetallehistorial.component';

@Component({
  selector: 'app-detallehistorial',
  standalone: true,
  imports: [RouterOutlet,ListardetallehistorialComponent],
  templateUrl: './detallehistorial.component.html',
  styleUrl: './detallehistorial.component.css'
})
export class DetallehistorialComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void{}
}
