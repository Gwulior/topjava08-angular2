/**
 * Created by gwuli on 09.11.2016.
 */
import {Component, Injectable} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {I18nService} from "../i18n/i18n.service";
import {I18Enum} from "../i18n/i18n.enum";
import {ErrorModel} from "../model/error.model";
import {ExceptionService} from "../service/exception/exception.service";

@Component({
    templateUrl: './templates/shared/header.html',
    selector: 'my-header-component',
    styleUrls: ["./assets/i18n.css"]
})
@Injectable()
export class HeaderComponent {

    private errors: ErrorModel[] = [];

    loginForm: FormGroup = this.formBuilder.group({
        "login": ["", Validators.required],
        "password": ["", Validators.required]
    });

    constructor(private authService: AuthService,
                private router: Router,
                private formBuilder: FormBuilder,
                private i18Service: I18nService,
                private exceptionService: ExceptionService) {
        exceptionService.errorStream.subscribe(
            e => {
                this.errors.push(e);
            }
        )
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(["login"]);
    }

    onSubmit() {
        this.authService.login(this.loginForm.value);
    }

    chooseEng() {
        this.i18Service.reloadLocale(I18Enum.en);
    }

    chooseRu() {
        this.i18Service.reloadLocale(I18Enum.ru);
    }
}