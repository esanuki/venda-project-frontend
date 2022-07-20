import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BaseGuard } from "src/app/shared/services/base.guard";

@Injectable()
export class ContaGuard extends BaseGuard implements CanActivate {

  constructor(route: Router) { super(route)}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    if (this.localStorage.getUser()) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }
}
