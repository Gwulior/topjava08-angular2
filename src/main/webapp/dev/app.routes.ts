import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./auth/login.component";
import {ModuleWithProviders} from "@angular/core";
import {MealListComponent} from "./meal/meal-list.component";
import {AuthActivateGuard} from "./auth/auth.activate.guard";
import {ProfileComponent} from "./user/profile.component";
import {RegisterComponent} from "./shared/register.component";
import {UserListComponent} from "./user/user-list.component";
/**
 * Created by gwuli on 31.07.2016.
 */


const appRoutes: Routes = [
    {
        path: "",
        // we need to pass parameter after slash, because out component-1, uses them, and they are required
        pathMatch: "full",
        redirectTo: "/meal-list",
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "meal-list",
        component: MealListComponent,
        canActivate: [AuthActivateGuard],
    },
    // {
    //     path: "user-list",
    //     component: UserListComponent,
    //     canActivate: [AuthActivateGuard],
    // },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthActivateGuard]
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "user-list",
        component: UserListComponent,
        canActivate: [AuthActivateGuard]
    }
];

// export const APP_ROUTER_PROVIDERS = [
// // there we pass out DeactivateHandlerGuard for providing in routes it's absolutely the same as:
//   //     provide(FlightEditGuard, {useClass: FlightEditGuard})
//   CanDeactivateGuard, AuthActivateGuard,
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
