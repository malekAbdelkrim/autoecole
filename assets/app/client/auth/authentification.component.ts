import { Component } from '@angular/core';
import { AuthService } from "./auth.service"

@Component({
	selector: 'app-authentification',
	templateUrl: './authentification.component.html'
})

export class AuthentificationComponent {

	constructor(private authService: AuthService){}
	isLogin(){
		return this.authService.isLogin();
	}

}