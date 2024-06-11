import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, } from '@angular/router';
import { ListarsegurosComponent } from './listarseguros/listarseguros.component';

@Component({
  selector: 'app-seguro',
  standalone: true,
  imports: [RouterOutlet,ListarsegurosComponent],
  templateUrl: './seguro.component.html',
  styleUrl: './seguro.component.css'
})
export class SeguroComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
