import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportVictor01Component } from './report-victor01/report-victor01.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterOutlet, ReportVictor01Component],
  templateUrl: './reports-victorarevalo.component.html',
  styleUrl: './reports-victorarevalo.component.css'
})
export class ReportsComponentVictorArevalo implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}

