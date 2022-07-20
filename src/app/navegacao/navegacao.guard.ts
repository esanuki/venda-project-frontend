import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BaseGuard } from "../shared/services/base.guard";

@Injectable()
export class NavegacaoGuard extends BaseGuard implements CanActivate {

  constructor(route: Router) { super(route);}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    if (!this.localStorage.getUser()) {
      this.router.navigate(['/conta/login']);
      return false;
    }
    return true;
  }
}
