import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthStore} from "../services/auth.store";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const user = this.authStore.state.user;

    if(!user) {
      return true;
    } else {
      console.log(user);
      this.router.navigate(['/loan']);
      return false;
    }
  }

}
