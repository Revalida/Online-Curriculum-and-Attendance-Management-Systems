import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

import { CheckOutComponent } from './component/check-out/check-out.component';
import { ProductAdminDashboardComponent } from './component/product-admin-dashboard/product-admin-dashboard.component';
import { HasRoleGuard } from './guard/has-role.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { PendingOrderComponent } from './component/pending-orders/pending-order.component';



const routes: Routes = [
  {
    path: "",
    redirectTo: "product",
    pathMatch: "full"
  },
  {
    path: "product",
    component: ProductComponent,
    canActivate: [HasRoleGuard]
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "checkout",
    component: CheckOutComponent
  },
  {
    path: "product-admin-dashboard",
    component: ProductAdminDashboardComponent
  },
  {
    path : "profile",
    component : ProfileComponent
  },
{
  path: "pendingpage",
  component: PendingOrderComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
