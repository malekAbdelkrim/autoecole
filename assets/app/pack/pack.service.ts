import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Pack } from "./pack.model";
@Injectable()
export class PackService{
constructor(private http: Http){}

ajouterPack(pack: Pack){
	        const body = JSON.stringify(pack);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/ajouterPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

ajouterDetailsPack(details,id){
	        const body = JSON.stringify({'details': details, 'idPack':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/ajouterDetailsPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

}

getDetailsPack(id){
			const body = JSON.stringify({'idPack':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/getDetailsPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

getAllPack(){
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/getAllPack', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

supprimerPack(id){
			const body = JSON.stringify({'idPack':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/supprimerPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	
}

getUnPack(id){
			const body = JSON.stringify({'idPack':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/getUnPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

ajouterUnDetailPack(detail){
		const body = JSON.stringify({'detail': detail, 'idPack': localStorage.getItem("idPack")});
		const headers = new Headers({'content-type': 'application/json'});
		return this.http.post('http://localhost:3000/pack/ajouterUnDetailPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

supprimerDetailPack(id){
		  const body = JSON.stringify({'idDetail':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/supprimerDetailPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

modifierDetailPack(detail,id){
		  const body = JSON.stringify({'detail': detail, 'idDetail':id});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/modifierDetailPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}

modifierPack(pack: Pack){
			const body = JSON.stringify({pack, 'idPack': localStorage.getItem("idPack")});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/pack/modifierPack', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
}




}