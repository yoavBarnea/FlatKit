import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from "@angular/common/http"
@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  declarations: [HomeComponent],
  providers: [AuthService]
})
export class CoreModule { }
