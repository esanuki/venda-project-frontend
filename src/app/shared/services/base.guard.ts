import { LocalStorageUtil } from './../utils/local-storage-util';
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';

export abstract class BaseGuard {

  localStorage: LocalStorageUtil = new LocalStorageUtil();

  constructor(protected router: Router) {}

  protected validateClaims(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    if (!this.localStorage.getUser()) return false;
    return true;
  }
}
