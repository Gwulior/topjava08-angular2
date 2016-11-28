import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    templateUrl: "./templates/profile.html"
})
export class RegisterComponent {

    private profileForm: FormGroup = this.formBuilder.group({
        'name': ['', Validators.required],
        'email': ['', Validators.required],
        'password': ['', Validators.required],
        'caloriesPerDay': ['', Validators.required]
    });

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private router: Router) {
    }


    save() {
        this.userService.registerUser(this.profileForm.value).subscribe(
            res => {
                this.router.navigate(['/login']);
            }
        );
    }

}