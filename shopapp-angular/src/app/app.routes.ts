import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {
  DetailProductComponent
} from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/detail-order/order.detail.component';
import { UserProfileComponent } from './components/user-profile/user.profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardFn } from './guards/auth.guard';
import { AdminGuardFn } from './guards/admin.guard';
import { VnpayComponent } from './components/vnpay/vnpay.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailUserComponent } from './components/order-detail-user/order-detail-user.component';
//import { OrderAdminComponent } from './components/admin/order/order.admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: DetailProductComponent },
  { path: 'orders', component: OrderComponent, canActivate: [AuthGuardFn] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardFn] },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'vnpay', component: VnpayComponent },
  { path: 'orderslist', component: OrderListComponent },
  { path: 'ordersdetailuser/:id', component: OrderDetailUserComponent },
  //Admin   
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardFn]
  },
];
