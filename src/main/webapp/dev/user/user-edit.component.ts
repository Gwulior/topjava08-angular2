/**
 * Created by gwuli on 13.11.2016.
 */
import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserModel} from "../model/user.model";
@Component({
    templateUrl: './templates/user/user-edit.html',
    selector: 'user-edit'
})
export class UserEditComponent {

    userForm: FormGroup;
    showToggle: boolean = false;

    @Output()
    onSaveEvent:EventEmitter<UserModel> = new EventEmitter<UserModel>();

    constructor(private formBuilder: FormBuilder) {
        this.initForm();
    }

    private initForm() {
        this.userForm = this.formBuilder.group(
            {
                id: [''],
                name: ['', Validators.required],
                email: ['', Validators.required],
                password: ['', Validators.required]
            }
        )
    }

    fillUserForm(user: UserModel) {
        this.userForm.patchValue({
            id: user.id,
            name: user.name,
            email: user.email,
            // password: user.password
        });
    }

    onSave() {
        this.onSaveEvent.emit(this.userForm.value);
        this.userForm.reset();
        this.closeModal();
    }

    closeModal() {
        this.showToggle = false;
    }

    resetForm() {
        this.userForm.reset();
    }

}