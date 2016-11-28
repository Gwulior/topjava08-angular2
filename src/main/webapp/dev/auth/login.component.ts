import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    templateUrl: './templates/login.html'
})
export class LoginComponent {

    loginForm: FormGroup;

    constructor(private authService: AuthService,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.loginForm = this.formBuilder.group({
            "login": ["", Validators.required],
            "password": ["", Validators.required]
        })
    }


    // onSubmit() {
    //     var loginResponse: Observable<Response> = this.authService.login(this.loginForm.value);
    //     loginResponse.subscribe(
    //         res => {
    //             this.router.navigate(["meal-list"])
    //         },
    //         error => {
    //             this.onError(error);
    //             console.log("login was failed" + error + this.onError, error);
    //
    //         }
    //     );
    //
    //
    // }
    //
    // onError(e) {
    //     console.log(e);
    // }
}