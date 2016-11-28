/**
 * Created by gwuli on 11.08.2016.
 */
import {Injectable} from "@angular/core";
import {Token} from "./auth.token";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {basePath, reqOptions} from "../shared/config.component";
import {UserModel} from "../model/user.model";
import {Observable} from "rxjs/Rx";
import {ExceptionService} from "../service/exception/exception.service";


@Injectable()
export class AuthService {

  authenticatedAs: UserModel = null;
  saveToken: Token = new Token("login", "password");


  constructor(private http: Http,
              private router: Router,
              private exceptionService: ExceptionService) {
  }

  login(token: Token): void {

    let headers:Headers = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });
    this.http.post(basePath + "/spring_security_check",
    "username=" + token.login +
    "&password=" + token.password,
      options).map( res => {
      return res;
    }).subscribe(
        res => {
          this.router.navigate(["meal-list"])
        },
        error => {
          this.exceptionService.onError(error);
          console.log("login was failed");
        }
    );;

  }

  checkSession(): Observable<Response> {
    return this.http.get(basePath + "/rest/profile", reqOptions);
  }

  hasAdminRole(): boolean {
    return this.authenticatedAs.roles.includes("ROLE_ADMIN");
  }

  logout() {
    this.http.get(basePath + "/logout").subscribe();
    this.authenticatedAs = null;
  }

  isAuthenticated(): Observable<boolean> {
    if (this.authenticatedAs == null) {
      return this.checkSession().map(res => {
        this.authenticatedAs = res.json();
        return true;
      }).catch((error: any)=> {
        this.authenticatedAs = null;
        return Observable.of(false);
      });
    } else {
      return Observable.of(true);
  }
  }


}
