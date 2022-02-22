import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthStore} from "../services/auth.store";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const role = this.authStore.state.user?.roles
    // console.log(role);
    const routeData = route.data['role']
    // console.log(routeData);

    const intersection = this.intersect(role, routeData)
    // console.log(intersection);
    console.log(intersection.length);

    if(intersection.length > 0) {
      console.log('authorized');
      return true;
    } else {
      console.log('not authorized')
      this.router.navigateByUrl('/loan')
      return false;
    }

  }

  intersect(a: [] | undefined, b: [] | undefined) {
    const setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
  }

}
