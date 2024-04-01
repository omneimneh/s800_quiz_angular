import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent, pathMatch: "full"},
  {path: 'users/:id', component: UserDetailsComponent},
];
