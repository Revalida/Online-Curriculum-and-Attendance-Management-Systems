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
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';

import { ProfileComponent } from './component/profile/profile.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

import { PriceFilterPipe } from './filter/pricefilter.pipe';

import { AcknowledgementComponent } from './component/acknowledgement/acknowledgement.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { ProductAdminDashboardComponent } from './component/product-admin-dashboard/product-admin-dashboard.component';
import { HasRoleGuard } from './guard/has-role.guard';
import { PendingOrderComponent } from './component/pending-orders/pending-order.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HeaderComponent,
    ProductComponent,
    CategoriesComponent,
    FilterPipe,
    SortPipe,
    PriceFilterPipe,
    AdminDashboardComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    NavComponent,
    HomeComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    AcknowledgementComponent,
    NotFoundComponent,
    CheckOutComponent,
    ProductAdminDashboardComponent,
    PendingOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[HeaderComponent],
  providers: [HasRoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
