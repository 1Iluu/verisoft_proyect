import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcitaComponent } from './listarcita/listarcita.component';


@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [RouterOutlet,ListarcitaComponent],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}

}
