import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {ValidateUtil} from "../../validators/validate.util";
import {ExceptionService} from "../../service/exception.service";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    templateUrl: "../../../templates/user/profile.html"
})
export class RegisterComponent implements OnInit {

    private profileForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private router: Router,
                private exceptionService: ExceptionService) {
    }

    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(64)])],
            'caloriesPerDay': ['', Validators.compose([Validators.required, ValidateUtil.validateUserCalories])]
        });
    }

    save() {
        this.userService.registerUser(this.profileForm.value).subscribe(
            res => {
                this.router.navigate(['/login']);
            },
            err => {
                this.exceptionService.onError(err);
            }
        );
    }

}