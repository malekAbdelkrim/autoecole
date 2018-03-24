import { Http, Headers, Response, RequestOptions, ResponseContentType } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { AutoEcole } from "./autoecole.model";
import { Horaire } from "./horaire.model";
import { Professeur } from "./professeur.model";

@Injectable()
export class AutoEcoleService{
		filesToUpload: Array<File> = [];

		constructor(private http: Http){}
		infoAutoEcole(){
			
			const headers = new Headers({'content-type' : 'application/json'});
			return this.http.post('http://localhost:3000/auto', '', {headers: headers})
				.map((response: Response) => response.json())
				.catch((response: Response) => Observable.throw(error.json));
		}

		ajouterAutoEcole(auto: AutoEcole){
				const body = JSON.stringify(auto);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/ajouter', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		modifierAutoEcole(auto: AutoEcole){
		    const body = JSON.stringify({auto, "id": localStorage.getItem('id_auto')});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/modifier', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		infoHoraire(){
			const headers = new Headers({'content-type' : 'application/json'});
			return this.http.post('http://localhost:3000/auto/infoHoraire', '', {headers: headers})
				.map((response: Response) => response.json())
				.catch((response: Response) => Observable.throw(error.json));
		}

		ajouterHoraire(horaire: Horaire){
			 const body = JSON.stringify({horaire, "id": localStorage.getItem('id_auto')});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/ajouterHoraire', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
		}

		modifierHoraire(horaire: Horaire){
			const body = JSON.stringify(horaire);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/modifierHoraire', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
		}

		ajouterProf(prof: Professeur){
		const body = JSON.stringify({prof, "id": localStorage.getItem('id_auto')});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/ajouterProf', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		getProf(){
			const headers = new Headers({'content-type' : 'application/json'});
			return this.http.post('http://localhost:3000/auto/getProf', '', {headers: headers})
				.map((response: Response) => response.json())
				.catch((response: Response) => Observable.throw(error.json));
		}

		removeProf(idProf: String){
		    const body = JSON.stringify({"idProf": idProf});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/removeProf', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		getProfById(){
			const body = JSON.stringify({"idProf": localStorage.getItem("idProf")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/getProfById', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		modifierProf(prof: Professeur,id){
			const body = JSON.stringify({prof,"idProf": localStorage.getItem("idProf")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/modifierProf', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		EnvoyerEmail(){
			//const body = JSON.stringify({"email":email, "pwd":pwd});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/envoyerEmail', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		EnvoyerSMS(){
			//const body = JSON.stringify({"email":email, "pwd":pwd});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/auto/sendSms', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}

		getFile(path: string):Observable<Blob>{
		  //const headers = new Headers({'content-type' : 'application/octet-stream'});
		  let options = new RequestOptions({responseType: ResponseContentType.Blob});

		  return this.http.get(path, options)
		     .map(response => { return new Blob([response.blob()], {type: 'application/pdf'}); })           
		      .catch(this.handleError);
		}
}