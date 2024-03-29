import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { BaseGuard } from 'src/app/shared/services/base.guard';

@Injectable()
export class SharedGuard extends BaseGuard implements CanActivate {
  constructor(route: Router) { super(route)}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {

    if (!this.localStorage.getUser()) {
      this.router.navigate(['conta/login']);
      return false;
    }

    return true;
  }
}
