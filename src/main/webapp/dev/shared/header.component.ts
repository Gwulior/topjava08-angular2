/**
 * Created by gwuli on 09.11.2016.
 */
import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {I18nService} from "../i18n/i18n.service";
import {I18Enum} from "../i18n/i18n.enum";
import {ErrorModel} from "../model/error.model";


@Component({
    templateUrl: './templates/shared/header.html',
    selector: 'my-header-component',
    styleUrls: ["./assets/i18n.css"]
})
export class HeaderComponent {

    errors: ErrorModel[] = [];

    loginForm: FormGroup = this.formBuilder.group({
        "login": ["", Validators.required],
        "password": ["", Validators.required]
    });

    constructor(private authService: AuthService,
                private router: Router,
                private formBuilder: FormBuilder,
                private i18Service: I18nService) {

    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(["login"]);
    }

    onSubmit() {
        var loginResponse: Observable<Response> = this.authService.login(this.loginForm.value);
        loginResponse.subscribe(
            res => {
                this.clearErrors();
                this.router.navigate(["meal-list"])
            },
            error => {
                this.onError(error);
                console.log("login was failed");
            }
        );
    }

    private clearErrors() {
        this.errors = [];
    }

    onError(e) {
        if (e) {
            let error = e.json();
            if (error.code === 'BadCredentialsException') {
                this.errors.push(new ErrorModel(this.i18Service.getMessage('error.login'), null))
            } else {
                this.errors.push(new ErrorModel(this.i18Service.getMessage('error.unavailable'), null))
            }
        }
        console.log(e);
    }

    chooseEng() {
        this.i18Service.reloadLocale(I18Enum.en);
    }
    chooseRu() {
        this.i18Service.reloadLocale(I18Enum.ru);
    }
}