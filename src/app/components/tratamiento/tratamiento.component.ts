import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartratamientoComponent } from './listartratamiento/listartratamiento.component';

@Component({
  selector: 'app-tratamiento',
  standalone: true,
  imports: [RouterOutlet, ListartratamientoComponent],
  templateUrl: './tratamiento.component.html',
  styleUrl: './tratamiento.component.css',
})
export class TratamientoComponent {
  constructor(public route: ActivatedRoute) {}
}
