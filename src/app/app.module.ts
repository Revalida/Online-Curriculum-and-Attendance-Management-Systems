import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminDashboardComponent } from "./component/admin-dashboard/admin-dashboard.component";
import { LoginComponent } from "./component/login/login.component";
import { SignupComponent } from "./component/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
