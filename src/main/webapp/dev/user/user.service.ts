import {Http, Response} from "@angular/http";
import {basePath, profilePath, reqOptions, reqOptionsJson, registerPath, usersPath} from "../shared/config.component";
import {Observable} from "rxjs/Rx";
import {UserModel} from "../model/user.model";
import {Injectable} from "@angular/core";
import {DateTimeTransformer} from "../date-time.transformer";
/**
 * Created by gwuli on 10.11.2016.
 */

@Injectable()
export class UserService {


    constructor(private http: Http,
                private dateTimeTransformer: DateTimeTransformer) {
    }

    getOwnProfile(): Observable<UserModel> {
        return this.http.get(basePath + profilePath, reqOptions).map(res => {
            console.log(res);
            return res.json();
        });
    }
    saveOwnProfle(value: UserModel): Observable<Response> {
        return this.http.put(basePath + profilePath, JSON.stringify(value), reqOptionsJson);
    }


    registerUser(value: UserModel): Observable<Response> {
        return this.http.post(basePath + registerPath, JSON.stringify(value), reqOptionsJson)
    }


    getUsers():Observable<UserModel[]> {
        return this.http.get(basePath + usersPath, reqOptions).map(this.mapUsers);
    }

    private mapUsers(res: Response): UserModel[] {
        return res.json();
    }

    delete(user: UserModel): Observable<Response> {
        return this.http.delete(basePath + usersPath + user.id, reqOptions);
    }

    updateUser(user: UserModel): Observable<Response> {
        return this.http.put(basePath + usersPath + user.id, JSON.stringify(user), reqOptionsJson);
    }

    createUser(user: UserModel): Observable<Response> {

        return this.http.post(basePath + usersPath, JSON.stringify(user), reqOptionsJson);
    }
}