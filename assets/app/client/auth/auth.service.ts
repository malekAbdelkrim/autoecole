import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";

@Injectable()
export class AuthService{

	constructor(private http: Http){}
	signup(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'content-type' : 'application/json'});
		return this.http.post('https://autoecoletest.herokuapp.com/auth', body, {headers: headers})
				.map((response: Response) => response.json())
				.catch((response: Response) => Observable.throw(error.json));
	}
	signin(user: User){
		const body = JSON.stringify(user);
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('https://autoecoletest.herokuapp.com/signin', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	logout(){
		localStorage.clear();

	}
	isLogin(){
		return localStorage.getItem('token') !== null;
	
	}
}