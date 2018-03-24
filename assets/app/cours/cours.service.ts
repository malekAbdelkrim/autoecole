import { Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Cours } from "./cours.model";
@Injectable()
export class CoursService{
constructor(private http: Http){}

ajouterNvCours(cours: Cours){

	const body = JSON.stringify(cours);
	const headers = new Headers({'content-type': 'application/json'});
	return this.http.post('http://localhost:3000/cours/ajouterNvCours', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

findAllCours(){
 	const headers = new Headers({'content-type': 'application/json'});
	return this.http.post('http://localhost:3000/cours/findAllCours', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));	

 }

getFile(path: string):Observable<Blob>{
		  let options = new RequestOptions({responseType: ResponseContentType.Blob});
		  return this.http.get(path, options)
		     .map(response => { return new Blob([response.blob()], {type: 'application/pdf'}); })           
		      .catch(this.handleError);
}

removeCours(idCours){
	const body = JSON.stringify({'idCours': idCours});
	const headers = new Headers({'content-type': 'application/json'});
	return this.http.post('http://localhost:3000/cours/removeCours', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	
}

findCoursById(id){
	const body = JSON.stringify({'idCours': localStorage.getItem('idCours')});
	const headers = new Headers({'content-type': 'application/json'});
	return this.http.post('http://localhost:3000/cours/findCoursById', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

updateCours(cours: Cours){
	const body = JSON.stringify({cours, "idCours": localStorage.getItem('idCours')});
	const headers = new Headers({'content-type': 'application/json'});
	return this.http.post('http://localhost:3000/cours/updateCours', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}


}