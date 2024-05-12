import { Routes } from '@angular/router';
//import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login' , pathMatch: 'full'},
    
    {path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent)},
    {path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent)},
    {path: '**', redirectTo: 'login' },
];
