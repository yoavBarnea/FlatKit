import { IAuthUser } from './../../models/authentication/auth-user.model';
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ILogin } from "../../models/authentication/login.model";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ILoginSuccessResponse } from "../../models/authentication/login-success.model";
import {
  IForgotPasswordRequest,
  IForgotPasswordResponse
} from "../../models/authentication/forgot-password.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  private appStorage: Storage = sessionStorage;

  loginEmail = "";

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // TODO: A client-side or network error occurred.
      console.error("An error occurred:", err.error.message);
    } else {
      // server side error
      console.error(
        `Backend returned code ${err.status}, ` + `body was: ${err.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  private setLoggedInUser(authUser: IAuthUser) {
    this.appStorage.setItem("LoggedInUser", JSON.stringify(authUser));
    this.appStorage.setItem("token", authUser.id.toString());
  }

  get LoggedInUser(): any {
    return JSON.parse(this.appStorage.getItem("LoggedInUser")) || null;
  }

  get token() {
    return this.appStorage.getItem("token");
  }

  get isLoggednIn() {
    return this.token ? true : false;
  }

  logout() {
    this.appStorage.removeItem("LoggedInUser");
    this.appStorage.removeItem("token");
    this.appStorage = sessionStorage;
   // this.router.navigate(["login"]);
  }

  logIn(loginData: ILogin, isRememberMe: boolean) {
    const url = environment.baseURL + "/login.php";

    if (isRememberMe) {
      this.appStorage = localStorage;
    }
   //  return this.http.post<ILoginSuccessResponse>(url, loginData).pipe(
    return this.http.post<any>(url, loginData).pipe(
      tap((resBody) => {
        if ( resBody.user) {
          this.setLoggedInUser(resBody.user);
          this.router.navigate(["/home"]);
        } else {
         // TODO: console.log(resBody.error);
        }
      }),
      catchError(this.handleError)
    );
  }

  forgetPassword(payload: IForgotPasswordRequest) {
    const url = environment.baseURL + "/forgot-password.php";

    return this.http
      .post<IForgotPasswordResponse>(url, payload)
      .pipe(catchError(this.handleError));
  }
}
