import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenavMain') sidenavMain: MatSidenav;
  mobileQuery: MediaQueryList;
  constructor() { }

  ngOnInit(): void {
  }

  onToggleMenu(): void{
    this.sidenavMain.toggle();
  }

  onMediaQueryChange(query: MediaQueryList): void {
    this.mobileQuery = query;
  }
}
