import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportCardenas1Component } from './report-cardenas1/report-cardenas1.component';

@Component({
  selector: 'app-josereports',
  standalone: true,
  imports: [RouterOutlet,ReportCardenas1Component],
  templateUrl: './josereports.component.html',
  styleUrl: './josereports.component.css'
})
export class JosereportsComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
