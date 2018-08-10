import { IForgotPasswordRequest } from './../../models/authentication/forgot-password.model';
import { AuthService } from "./../../core/services/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "../../../../node_modules/@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  email = "";

  constructor(private authService: AuthService) {
    this.email = this.authService.loginEmail;
    console.log("----", this.authService.loginEmail);
  }

  onEmail(event) {
    this.authService.loginEmail = event.target.value;
  }

  sendForm(form: FormGroup) {
    if (form.valid) {
      const payload: IForgotPasswordRequest = form.value;
      this.subscription = this.authService
        .forgetPassword(payload)
        .subscribe(res => {
          console.log("res", res);
          if (!res.error) {
            console.log("great");
          } else {
            console.log("forgot error :", res.error);
            // TODO : to Add a message modal 
          }
        });
    }
  }
  // ng hooks

  ngOnInit() {}

  ngOnDestroy() {}
}
