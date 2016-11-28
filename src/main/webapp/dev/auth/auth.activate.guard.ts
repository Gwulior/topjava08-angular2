import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

/**
 * Created by gwuli on 11.08.2016.
 */
@Injectable()
export class AuthActivateGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router) {
    console.log("guard created");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthenticated().map(res => {
      if (!res) {
        this.router.navigate(["login"]);
        console.log("nizzya)");
      }
      return res;
    });
  }
}
