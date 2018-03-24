import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Contrat } from "./contrat.model";
import { Paiement } from "./paiement.model";



@Injectable()
export class ContratService{
constructor(private http: Http){}

	findAllUser(){
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/findAllUser', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getAllPack(){
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getAllPack', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getInfoAutoEcole(){
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getInfoAutoEcole', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}
	getPromo(){
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getPromo', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getPromoArgentReduction(id){
		const body = JSON.stringify({'idPromo':id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getPromoArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getPromoPersonneReduction(id){
		const body = JSON.stringify({'idPromo':id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getPromoPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	ajouterContrat(contrat : Contrat){
		const body = JSON.stringify(contrat);
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/ajouterContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterListPackContrat(id,idPack){
		const body = JSON.stringify({"idContrat":id,"idPack":idPack});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/ajouterListPackContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	getAllContrat(){
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getAllContrat', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	updateDateExamenCode(id,dt){
		const body = JSON.stringify({"idContrat":id,"dtCode":dt});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/updateDateExamenCode', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	updateDateExamenConduit(id,dt){
	    const body = JSON.stringify({"idContrat":id,"dtConduit":dt});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/updateDateExamenConduit', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	updateReussiCode(id,reussi){
	    const body = JSON.stringify({"idContrat":id,"reussi":reussi});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/updateReussiCode', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	updateReussiConduit(id,reussi){
	    const body = JSON.stringify({"idContrat":id,"reussi":reussi});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/updateReussiConduit', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	supprimerContrat(id){
		const body = JSON.stringify({"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/supprimerContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	getInfoContrat(id){
		const body = JSON.stringify({"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getInfoContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	getPromoById(id){
		const body = JSON.stringify({"idPromo":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getPromoById', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getPackContrat(id){
		const body = JSON.stringify({"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getPackContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	supprimerTousListPackContrat(id){
	    const body = JSON.stringify({"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/supprimerTousListPackContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}
	updateContrat(contrat,id){
	    const body = JSON.stringify({"contrat": contrat,"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/updateContrat', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	getInfoPack(id){
		const body = JSON.stringify({"idPack":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getInfoPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	getAllPaiement(id){
		const body = JSON.stringify({"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/getAllPaiement', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterTranche(paie: Paiement){
        const body = JSON.stringify(paie);
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/ajouterTranche', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}
	supprimerTranche(id){
		const body = JSON.stringify({"idContrat":id});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/contrat/supprimerTranche', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}
}