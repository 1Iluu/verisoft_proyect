import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarrespuestaComponent } from './listarrespuesta/listarrespuesta.component';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [RouterOutlet, ListarrespuestaComponent],
  templateUrl: './respuesta.component.html',
  styleUrl: './respuesta.component.css'
})
export class RespuestaComponent implements OnInit {
  constructor(public route:ActivatedRoute){}
    ngOnInit():void {}
  }
