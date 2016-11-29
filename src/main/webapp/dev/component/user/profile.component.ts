import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    templateUrl: "../../../templates/user/profile.html"
})
export class ProfileComponent implements OnInit{

    private profileForm: FormGroup = this.formBuilder.group({
        'name': ['', Validators.required],
        'email': ['', Validators.required],
        'password': ['', Validators.required],
        'caloriesPerDay': ['', Validators.required]
    });

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.userService.getOwnProfile().subscribe(
            res => {
                this.profileForm.patchValue(res);
            }
        )
    }

    // initForm() {
    //     this.userService.getOwnProfile().subscribe(
    //         res => {
    //             this.profileForm = this.formBuilder.group({
    //                 'name': [res.name, Validators.required],
    //                 'email': [res.email, Validators.required],
    //                 'password': ['', Validators.required],
    //                 'caloriesPerDay': [res.caloriesPerDay, Validators.required]
    //             });
    //         }
    //     )
    // }

    save() {
        this.userService.saveOwnProfle(this.profileForm.value).subscribe();
    }

}