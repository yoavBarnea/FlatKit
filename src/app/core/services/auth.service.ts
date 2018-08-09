import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ILogin } from "../../models/authentication/login.model";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ILoginSuccessResponse } from "../../models/authentication/login-success.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  private appStorage: Storage = sessionStorage;

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
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

  private setLoggedInUser(loggedInUser: ILoginSuccessResponse) {
    this.appStorage.setItem("LoggedInUser", JSON.stringify(loggedInUser)) ;
    this.appStorage.setItem("token", loggedInUser.user.id.toString());
  }

  get LoggedInUser() {
    return localStorage.getItem("LoggedInUser") || null;
  }

  get token() {
    return this.appStorage.getItem('token');
  }

  get isLoggednIn() {
    return this.token !== null;
  }

  logout() {
    this.appStorage.removeItem("LoggedInUser");
    this.appStorage.removeItem("token");
    this.appStorage = sessionStorage;
    this.router.navigate(["login"]);
  }

  logIn(loginData: ILogin, isRememberMe: boolean) {
    if (isRememberMe) {
      this.appStorage = localStorage;
    }
    const url = "https://globalbit.co.il/front-end-assignment/login.php";

    return this.http.post<ILoginSuccessResponse>(url, loginData).pipe(
      tap(loggedInUser => {
        this.setLoggedInUser(loggedInUser);
        this.router.navigate(["home"]);
      }),
      catchError(this.handleError)
    );
  }


}
