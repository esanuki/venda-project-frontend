import { Router } from '@angular/router';
import { LocalStorageUtil } from './../../shared/utils/local-storage-util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor (
    private router: Router) {}

  public show: boolean;

  public isCollapsed: boolean;

  email: string = '';
  localStorage: LocalStorageUtil = new LocalStorageUtil();


  ngOnInit(): void {
    this.show = true;
    this.isCollapsed = true;
  }

  logado() {
    let user = this.localStorage.getUser();
    this.email = user !== null ? user.email : '';
    return this.email !== '';
  }

  sair() {
    this.localStorage.clearLocalStorage();
    this.router.navigate(['/conta/login']);
  }

}
