import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('body-bg');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('body-bg');
  }
}

