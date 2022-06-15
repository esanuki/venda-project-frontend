import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public show: boolean;

  public isCollapsed: boolean;

  constructor() { }

  ngOnInit(): void {
    this.show = true;
    this.isCollapsed = true;
  }

}
