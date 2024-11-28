import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard} from './guards/auth.guard';
import { UserMainComponent} from './components/user-main/user-main.component';
import { AdminMainComponent} from './components/admin-main/admin-main.component';
import { AdminCarsComponent} from './components/admin-cars/admin-cars.component';
import { EditProfileComponent} from './components/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userMain', component: UserMainComponent, canActivate: [AuthGuard] },
  { path: 'adminMain', component: AdminMainComponent, canActivate: [AuthGuard] },
  { path: 'adminCars', component: AdminCarsComponent, canActivate: [AuthGuard] },
  { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuard] },
];
