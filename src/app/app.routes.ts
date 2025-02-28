import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlinkLayoutComponent } from './layouts/blink-layout/blink-layout.component';
import { NofoundComponent } from './pages/nofound/nofound.component';
import { ProductsComponent } from './pages/products/products.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedinGuard } from './core/guards/loggedin/loggedin.guard';



export const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"", component: AuthLayoutComponent, canActivate: [loggedinGuard],
    children: [
    { path: "login", loadComponent: ()=>import('./pages/login/login.component').then((c)=>c.LoginComponent),title: "Login" },
    {path:"register", loadComponent: ()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent), title: "Register"},
  ]},
  {path:"", component: BlinkLayoutComponent,
    children: [
    {path:"home", loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent), title: "Home", canActivate: [authGuard]},
    {path:"products", loadComponent: ()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent), title: "Products"},
    {path:"details/:id", loadComponent: ()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent), title: "Products"},
    {path:"products/:id", component: ProductsComponent, title: "Product"},
    {path:"cart", loadComponent: ()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent), title: "Cart"},
    {path:"checkout/:id", loadComponent: ()=> import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title: "Checkout"},
    {path:"brands", loadComponent: ()=>import('./pages/brands//brands.component').then((c)=>c.BrandsComponent), title: "Cart"},
    {path:"categories", loadComponent: ()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title: "Categories"},
    {path:"allorders", loadComponent: ()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent), title: "Categories"},
    {path:"**", component:NofoundComponent, title: "404 Not Found"},
  ]},
];
