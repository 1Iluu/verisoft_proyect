import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListarsegurosComponent } from '../paciente/seguro/listarseguros/listarseguros.component';
import { ListarcirugiasComponent } from '../paciente/cirguias/listarcirugias/listarcirugias.component';


@Component({
  selector: 'app-landinpage',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ListarsegurosComponent,ListarcirugiasComponent],
  templateUrl: './landinpage.component.html',
  styleUrl:    './landinpage.component.css'
})
export class LandinpageComponent {

}
