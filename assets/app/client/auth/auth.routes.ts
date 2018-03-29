import { Routes } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

export const AUTH_ROUTES: Router = [
	{ path: '', redirectTo: 'signup', pathMatch: 'full' },
	{path: 'signin', component: SigninComponent},
	{ path: 'signup', component: SignupComponent},
	{path: 'logout', component: LogoutComponent}	

];
		