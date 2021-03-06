import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { CoreRoutingModule } from "./core-routing.module";
import { HomeComponent } from "./home/home.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth.guard";
import { SharedModule } from './../shared/shared.module';
import { httpInterceptorProviders } from "./interceptors/interceptors-providers";

@NgModule({
  imports: [CommonModule, CoreRoutingModule, HttpClientModule, SharedModule],
  declarations: [HomeComponent],
  providers: [AuthService, AuthGuard, httpInterceptorProviders]
})
export class CoreModule {}
