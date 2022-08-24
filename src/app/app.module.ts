import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { ProductComponent } from './component/product/product.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { FilterPipe } from './filter/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from './filter/sort.pipe';

import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HeaderComponent,
    ProductComponent,
    CategoriesComponent,
    FilterPipe,
    SortPipe,
    AdminDashboardComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    NavComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
