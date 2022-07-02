import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth-guard.helper';

const routes: Routes = [
  { path: 'home', component: HomeComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
