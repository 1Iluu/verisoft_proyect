import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaroncologoComponent } from './listaroncologo/listaroncologo.component';

@Component({
  selector: 'app-oncologo',
  standalone: true,
  imports: [RouterOutlet,ListaroncologoComponent],
  templateUrl: './oncologo.component.html',
  styleUrl: './oncologo.component.css'
})
export class OncologoComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }
}

