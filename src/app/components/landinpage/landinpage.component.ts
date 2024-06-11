import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListarsegurosComponent } from '../paciente/seguro/listarseguros/listarseguros.component';


@Component({
  selector: 'app-landinpage',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ListarsegurosComponent],
  templateUrl: './landinpage.component.html',
  styleUrl:    './landinpage.component.css'
})
export class LandinpageComponent {

}
