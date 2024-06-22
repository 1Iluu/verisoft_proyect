import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Report01Component } from './report01/report01.component';

@Component({
  selector: 'app-reportsaf',
  standalone: true,
  imports: [RouterOutlet,Report01Component],
  templateUrl: './reportsaf.component.html',
  styleUrl: './reportsaf.component.css'
})
export class ReportsafComponent implements OnInit {
  constructor(public route: ActivatedRoute){}
ngOnInit(): void {}
}
