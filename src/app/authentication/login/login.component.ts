import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "../../../../node_modules/@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { ILogin } from "./../../models/authentication/login.model";
import { ILoginSuccessResponse } from "../../models/authentication/login-success.model";
import { AuthService } from "./../../core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  login(form: FormGroup) {
    let loginData: ILogin;
    let keepMeSignIn: boolean;

    // console.log('loginData:', form.value);
    return;

    if (form.valid) {
      loginData = {
        email: form.value.loginEmail,
        password: form.value.loginPassword
      };
      keepMeSignIn = form.value.keepMeSignIn || false;

      this.loginSubscription = this.authService
        .logIn(loginData, keepMeSignIn)
        .subscribe(result => {
          if (result.user) {
            const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
            this.router.navigate([returnUrl || "/"]);
          }
        });

    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
