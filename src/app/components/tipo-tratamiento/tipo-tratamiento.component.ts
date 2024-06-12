import { ListarTipoTratamientoComponent } from './listar-tipo-tratamiento/listar-tipo-tratamiento.component';
import { TipoTratamiento } from './../../models/tipo_de_tratamiento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule si usas standalone components

@Component({
  selector: 'app-tipo-tratamiento',
  standalone: true,
  imports: [RouterOutlet, ListarTipoTratamientoComponent],
  templateUrl: './tipo-tratamiento.component.html',
  styleUrls: ['./tipo-tratamiento.component.css']
})
export class TipoTratamientoComponent implements OnInit {
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }
}

