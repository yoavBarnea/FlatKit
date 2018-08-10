import { AuthService } from "./../../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "../../../../node_modules/@angular/forms";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {

  loginEmail = '';

  constructor(private authService: AuthService) {
    this.loginEmail = this.authService.loginEmail;
    console.log('----', this.authService.loginEmail);

  }

  onEmail(event) {
    this.authService.loginEmail = event.target.value;
  }
  
  sendForm(vForm: FormGroup) {
    if (vForm.valid) {
    }
  }

  // ng hooks
  ngOnInit() {}
}
