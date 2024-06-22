import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Report01Component } from './report01/report01.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet, Report01Component],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
      
  }

}
