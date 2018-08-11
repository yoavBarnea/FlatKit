import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { IAuthUser } from "./../../../models/authentication/auth-user.model";

import { AuthService } from "./../../../core/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  loggedInUser: any;
  userFirstName: string;

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.loggedInUser = this.authService.LoggedInUser || null;
    console.log('LoggedInUser', this.loggedInUser);
    this.userFirstName = (this.loggedInUser && this.loggedInUser.profile.first_name) || "guest" ;
  }
}
