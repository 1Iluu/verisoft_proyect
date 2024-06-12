import { Component, OnInit } from '@angular/core';
import { ListaralergiasComponent } from './listaralergias/listaralergias.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-oncologo',
  standalone: true,
  imports: [ListaralergiasComponent,RouterOutlet],
  templateUrl: './oncologo.component.html',
  styleUrl: './oncologo.component.css'
})
export class oncologoComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
