import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { NouveauPack } from "./nvPack.model";
import { PrixHeureCodeConduit } from "./prixHeureCodeConduit.model";
import { Promo } from "./promo.model";
import { ArgentPourcentage } from "./argentPourcentage.model";
import { PersonneReduction } from "./personneReduction.model";
import { RemiseSurPack } from "./remiseSurPack.model";


@Injectable()
export class PromotionService{

	
	constructor(private http: Http){}

	getPromotion(){ 
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/getPromo', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

		}
	ajouterNvPack(pack: NouveauPack){
			const body = JSON.stringify(pack);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/nvPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterPromoPack(remisePack: RemiseSurPack){
			const body = JSON.stringify(remisePack);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterPromoPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	modifierPromoPack(remisePack: RemiseSurPack){
			const body = JSON.stringify({remisePack, 'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierPromoPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	supprimerNvPack(id){
		const body = JSON.stringify({'idPromo': id});
		const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/removePromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	findPromoById(){
		const body = JSON.stringify({'idPromo': localStorage.getItem("idPromo")});
		const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/findById', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	modifierNvPack(pack: NouveauPack){
			const body = JSON.stringify({pack, 'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifiernvPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterPrixHeureCodeConduit(pack: PrixHeureCodeConduit){
		const body = JSON.stringify(pack);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterPHCC', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	modifierPrixHeureCodeConduit(pack: PrixHeureCodeConduit){
		const body = JSON.stringify({pack, 'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierPHCC', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	ajouterArgentReduction(pack: Promo ){
            const body = JSON.stringify(pack);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}
	ajouterDetailsArgentReduction(argentPourcentage: ArgentPourcentage,id){
			const body = JSON.stringify({argentPourcentage, 'idPromo': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterDetailsArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getDetailsArgentReduction(id){
			const body = JSON.stringify({'idPromo': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/getDetailsArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}


	modifierDetailsArgentReduction(argentPourcentage: ArgentPourcentage,id){
			const body = JSON.stringify({argentPourcentage,'idDetail': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierDetailsArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	supprimerDetailsArgentReduction(id){
			const body = JSON.stringify({'idDetail': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/supprimerDetailsArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}
	modifierArgentReduction(promo){
		const body = JSON.stringify({promo,'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierArgentReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterDetailsPromotion(details,id){
	        const body = JSON.stringify({'details': details, 'idPromo':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterDetailsPromotion', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}
	modifierDetailPromo(detail,id){
		  const body = JSON.stringify({'detail': detail, 'idDetail':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierDetailPromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	supprimerDetailPromo(id){
		  const body = JSON.stringify({'idDetail':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/supprimerDetailPromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	getDetailsPromo(){
		 const body = JSON.stringify({'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/getDetailsPromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}
	ajouterUnDetailPromo(detail){
		const body = JSON.stringify({'detail': detail, 'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterUnDetailPromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterPersonneReduction(pack: Promo){
		 const body = JSON.stringify(pack);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	ajouterDetailsPersonneReduction(personneReduction:PersonneReduction, id){
	       const body = JSON.stringify({personneReduction, 'idPromo': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/ajouterDetailsPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}
	getDetailsPersonneReduction(id){
		const body = JSON.stringify({'idPromo': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/getDetailsPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	supprimerDetailsPersonneReduction(id){
		    const body = JSON.stringify({'idDetail': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/supprimerDetailsPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	modifierDetailsPersonneReduction(personneReduction:PersonneReduction,id){
	         const body = JSON.stringify({personneReduction,'idDetail': id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierDetailsPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	modifierPersonneReduction(promo){
		const body = JSON.stringify({promo,'idPromo': localStorage.getItem("idPromo")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierPersonneReduction', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	modifierValablePromo(id,typePack,valable){
		const body = JSON.stringify({'idPromo': id, 'typePack': typePack, 'valable': valable});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierValablePromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	modifierHistoriquePromo(id,typePack){

		const body = JSON.stringify({'idPromo': id, 'typePack': typePack});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/promotion/modifierHistoriquePromo', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}


}