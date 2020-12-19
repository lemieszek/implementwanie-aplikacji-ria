import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  finishedDate: Date;
  constructor() {
    this.finishedDate = new Date(1608378172599)
  }

  ngOnInit(): void {
  }

}
