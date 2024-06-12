import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-alergias',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './alergias.component.html',
  styleUrl: './alergias.component.css'
})
export class AlergiasComponent implements OnInit {
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {}

}

