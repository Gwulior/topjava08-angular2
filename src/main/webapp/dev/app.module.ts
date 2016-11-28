import {NgModule, APP_INITIALIZER} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {MealListComponent} from "./meal/meal-list.component";
import {LoginComponent} from "./auth/login.component";
import {AuthService} from "./auth/auth.service";
import {AuthActivateGuard} from "./auth/auth.activate.guard";
import {MealService} from "./meal/meal.service";
import {EditMealComponent} from "./meal/meal-edit.component";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {HeaderComponent} from "./shared/header.component";
import {ProfileComponent} from "./user/profile.component";
import {UserService} from "./user/user.service";
import {RegisterComponent} from "./shared/register.component";
import {UserListComponent} from "./user/user-list.component";
import {UserEditComponent} from "./user/user-edit.component";
import {I18nPipe} from "./pipe/i18n.pipe";
import {I18nService} from "./i18n/i18n.service";
import {I18Enum} from "./i18n/i18n.enum";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {DatePipe} from "@angular/common";
import {DateTimeTransformer} from "./date-time.transformer";
import {GrowlModule} from "primeng/components/growl/growl";
import {ExceptionService} from "./service/exception/exception.service";

/**
 * Created by gwuli on 30.10.2016.
 */


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing, CalendarModule, DataTableModule, GrowlModule],
    declarations: [AppComponent, MealListComponent, LoginComponent,
        EditMealComponent, HeaderComponent,
        ProfileComponent,
        RegisterComponent,
        UserListComponent,
        UserEditComponent,
        I18nPipe
    ],
    bootstrap: [AppComponent],
    providers: [AuthService, AuthActivateGuard, MealService, UserService,
        I18nService, DateTimeTransformer, DatePipe, ExceptionService,
        {
            provide: APP_INITIALIZER,
            // useFactory: (i18NService: I18nService) => () => i18NService.initMessages(I18Enum.ru),
            // or
            useFactory: initApp,
            deps: [I18nService],
            multi: true
        }
    ]
})
export class TopJavaModule {

}

export function initApp(i18nService: I18nService) {
    // Do initing of services that is required before app loads
    // NOTE: this factory needs to return a function (that then returns a promise)
    return () => i18nService.initMessages(I18Enum.ru);  // + any other services...
}