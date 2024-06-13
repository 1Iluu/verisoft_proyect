import { Component, OnInit } from '@angular/core';
import { ListarcirugiasComponent } from './listarcirugias/listarcirugias.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cirguias',
  standalone: true,
  imports: [ListarcirugiasComponent,RouterOutlet],
  templateUrl: './cirguias.component.html',
  styleUrl: './cirguias.component.css'
})
export class CirguiasComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}

}
