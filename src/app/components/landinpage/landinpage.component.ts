import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormsModule,  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-landinpage',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    FormsModule, MatFormFieldModule, MatInputModule
  
  ],
  templateUrl: './landinpage.component.html',
  styleUrl:    './landinpage.component.css'
})
export class LandinpageComponent {
  aceptar(): void {}
  form: FormGroup = new FormGroup({});
}
