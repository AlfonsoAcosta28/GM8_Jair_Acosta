import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitLayoutComponent } from './share/init-layout/init-layout.component';
import { AdminLayoutComponent } from './share/admin-layout/admin-layout.component';
import { HasSessionGuard } from './core/guards/has-session.guard';

const routes: Routes = [
  {path: '', redirectTo:'/sign-in', pathMatch: 'full'},
  {path: '', component: InitLayoutComponent, children:[
    { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule) },
    { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
  
  ]},
  {path: '', component: AdminLayoutComponent, children:[
    { path: 'inventory', loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule) , canActivate:[HasSessionGuard] },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate:[HasSessionGuard] },
    { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) ,canActivate:[HasSessionGuard] },
    { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  ]},
  {path: '**', redirectTo:'/not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
