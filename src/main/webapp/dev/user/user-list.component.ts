import {Component, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {UserService} from "./user.service";
import {UserEditComponent} from "./user-edit.component";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    templateUrl: "./templates/user/user-list.html"
})
export class UserListComponent {

    usersHolder: Observable<UserModel[]>;

    @ViewChild(UserEditComponent)
    private userEditChild: UserEditComponent;

    constructor(private userService: UserService) {
        this.reloadUsers();
    }

    private reloadUsers() {
        this.usersHolder = this.userService.getUsers();
    }

    showCreateModal() {
        this.userEditChild.resetForm();
        this.userEditChild.showToggle = true;
    }

    onEdit(user) {
        this.showCreateModal();
        this.userEditChild.fillUserForm(user.data);
    }

    onSave(user: UserModel) {
        (user.id ? this.userService.updateUser : this.userService.createUser)
            .bind(this.userService)(user)
            .subscribe(res => {
                this.reloadUsers();
            });
    }

    onDelete(user: UserModel) {
        this.userService.delete(user).subscribe(
            res => {
                this.reloadUsers();
            }
        );
    }

    onChangeActiveStatus(user: UserModel) {
        user.enabled = !user.enabled;
        this.userService.updateUser(user).subscribe(
            res => {
                this.reloadUsers();
            }
        );
    }


}