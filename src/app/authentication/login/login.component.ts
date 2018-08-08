import { Component, OnInit } from "@angular/core";
import { FormGroup } from "../../../../node_modules/@angular/forms";
import { Router } from "@angular/router";

import { ILogin } from './../../models/authentication/login.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  login(form: FormGroup) {
    let loginData: ILogin;
    console.log('loginData:', form.value);

    if (form.valid) {
      loginData = { email: form.value.loginEmail, password:  form.value.loginPassword } ;
      console.log('loginData:', loginData);
     // this.router.navigate(["/home"]);
    }
  }
}
