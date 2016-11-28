import {Component, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {UserModel} from "../model/user.model";
import {UserService} from "./user.service";
import {UserEditComponent} from "./user-edit.component";
import {ErrorModel} from "../model/error.model";
import {I18nService} from "../i18n/i18n.service";
import {ExceptionService} from "../service/exception/exception.service";
/**
 * Created by gwuli on 30.10.2016.
 */

@Component({
    templateUrl: "./templates/user/user-list.html"
})
export class UserListComponent {

    usersHolder: Observable<UserModel[]>;
    errors: ErrorModel[] = [];

    @ViewChild(UserEditComponent)
    private userEditChild: UserEditComponent;

    constructor(private userService: UserService,
                private i18Service: I18nService,
                private exceptionService: ExceptionService) {
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
        this.userService.saveUser(user)
            // .catch((error: any) => {
            //     this.exceptionService.onError(error);
            //     return Observable.throw(error.json().error || 'Server error')
            // })
            .subscribe(
                res => {
                    this.reloadUsers();
                },
                err => {
                    this.exceptionService.onError(err);
                }
            );
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
        this.userService.saveUser(user)
            // .catch((error: any) => {
            //     this.header.onError(error);
            //     return Observable.throw(error.json().error || 'Server error')
            // })
            .subscribe(
                res => {
                    this.reloadUsers();
                },
                err => {
                    this.exceptionService.onError(err);
                }
            );
    }

}