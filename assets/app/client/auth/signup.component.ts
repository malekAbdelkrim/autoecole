import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { User } from "./user.model";

import { AuthService } from "./auth.service";


@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit{
	
	myForm: FormGroup;
	constructor(private authService: AuthService){}

	onSubmit(){
		const user = new User(
				this.myForm.value.email,
				this.myForm.value.password,
				this.myForm.value.nom,
				this.myForm.prenom
		);
		this.authService.signup(user).subscribe(
			data => {console.log(data);
					 localStorage.setItem('token',data.token);
					 localStorage.setItem('userId',data.obj._id);
					 },
			error => console.log(error)
		);
		console.log(user);
		console.log(this.myForm.valid);
		this.myForm.reset();
	}

	ngOnInit(){

		this.myForm = new FormGroup({
			nom: new FormControl(null, Validators.required),
			prenom: new FormControl(null, Validators.required),
			password: new FormControl(null, Validators.required),
			email: new FormControl(null, [
											Validators.required, 
											Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
		});
		console.log("hello this is the first");
	}


}