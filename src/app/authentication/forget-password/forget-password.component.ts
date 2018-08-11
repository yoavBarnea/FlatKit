import { Router } from '@angular/router';
import { IForgotPasswordRequest, IForgotPasswordResponse } from './../../models/authentication/forgot-password.model';
import { AuthService } from "./../../core/services/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "../../../../node_modules/@angular/forms";
import { Subscription } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  email = "";
  responseMessage = "";

  constructor(private router: Router, private authService: AuthService, private ngbModal: NgbModal) {
    this.email = this.authService.loginEmail;
    console.log("----", this.authService.loginEmail);
  }

  onEmail(event) {
    this.authService.loginEmail = event.target.value;
  }

  sendForm(form: FormGroup, vModal) {
    if (form.valid) {
      const payload: IForgotPasswordRequest = form.value;
      this.subscription = this.authService
        .forgetPassword(payload)
        .subscribe((res: IForgotPasswordResponse) => {

          this.responseMessage = `We recieved your request and sent a mail with  link to reset your password.
          Please check your email for furture instructions, and then login again`;

          if (res.error) {
            this.responseMessage = "Email doesn't exist in our records, Please Try a different email";
            this.email = this.authService.loginEmail = "";
          }

          // when closing the modal message:
          // if email exist, then user will be navigated back to the login page
          // if email doen't exist (200 with error object), then user will stay and try a differnt email
          this.ngbModal.open(vModal, {ariaLabelledBy: 'modal request feadback', size: 'sm', centered: true} ).result.then( () => {
              if (!res.error) {
                this.router.navigate(["../"]);  // when close button was click - back to the login page
              }},
              () => {
                if (!res.error) {
                  this.router.navigate(["../"]);  // when dismist button was click  - back to the login page
                }}


          );

        });
    }
  }

  // --------  ng hooks  -------------

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
