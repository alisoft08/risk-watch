import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';
import {SignUpForm} from './IAM/presentation/sign-up-form/sign-up-form';
import {SignInForm} from './IAM/presentation/sign-in-form/sign-in-form';
import {authGuard} from './shared/application/auth-guard';

const about = () => import('./shared/presentation/views/about/about').then(m => m.About);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const learningRoutes = () => import('./learning/presentation/learning.routes').then(m => m.learningRoutes);

const baseTitle = 'Risk Watch';
export const routes: Routes = [
  { path: 'sign-in',  component:  SignInForm,                   title: `Sign In - ${baseTitle}` },
  { path: 'sign-up',  component:  SignUpForm,                   title: `Sign Up - ${baseTitle}` },
  { path: 'home',     component:      Home,                     title: `Home - ${baseTitle}`,           canActivate: [authGuard] },
  { path: 'about',    loadComponent:  about,                    title: `About - ${baseTitle}`,          canActivate: [authGuard] },
  { path: 'suppliers', loadChildren:   learningRoutes,                                                  canActivate: [authGuard] },
  { path: '',         redirectTo:     '/sign-in',               pathMatch: 'full' },
  { path: '**',       loadComponent:  pageNotFound,             title:  `Page Not Found - ${baseTitle}` }
];
