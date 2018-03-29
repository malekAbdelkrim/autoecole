import { Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Avis } from "./avis.model";
@Injectable()
export class AvisService{
constructor(private http: Http){}
	ajouterAvis(avis: Avis){
		    const body = JSON.stringify(avis);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/avis/ajouterAvis', body, {headers: headers})
			 .map((response: Response) => response.json())
			 .catch((response: Response) => Observable.throw(error.json));
	}

	findAllAvis(){
		 const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/avis/findAllAvis','', {headers: headers})
			 .map((response: Response) => response.json())
			 .catch((response: Response) => Observable.throw(error.json));
	}

	findAvisByIdUser(id){
			const body = JSON.stringify({"idUser":id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/avis/findAvisByIdUser', body, {headers: headers})
			 .map((response: Response) => response.json())
			 .catch((response: Response) => Observable.throw(error.json));
	}

	modifierAvis(id,avis){
		    const body = JSON.stringify({"idAvis":id, "avis":avis});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/avis/modifierAvis', body, {headers: headers})
			 .map((response: Response) => response.json())
			 .catch((response: Response) => Observable.throw(error.json));
	}

	supprimerAvis(id){
		    const body = JSON.stringify({'idAvis': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/avis/supprimerAvis', body, {headers: headers})
			 .map((response: Response) => response.json())
			 .catch((response: Response) => Observable.throw(error.json));
	}

}