import { ListarTipoTratamientoComponent } from './listar-tipo-tratamiento/listar-tipo-tratamiento.component';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipo-tratamiento',
  standalone: true,
  imports: [RouterOutlet, ListarTipoTratamientoComponent],
  templateUrl: './tipo-tratamiento.component.html',
  styleUrls: ['./tipo-tratamiento.component.css'],
})
export class TipoTratamientoComponent {
  constructor(public route: ActivatedRoute) {}
}
