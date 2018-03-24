import { Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Quiz } from "./quiz.model";
@Injectable()
export class QuizService{
	
	constructor(private http: Http){}

	getAllSerie(){

			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/quiz/getAllSerie', '', {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	ajouterSerie(titreSerie){
	 		const body = JSON.stringify({'titreSerie': titreSerie});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/quiz/ajouterSerie', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	supprimerSerie(idSerie){
		const body = JSON.stringify({'idSerie': idSerie});
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/quiz/supprimerSerie', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	ajouterQuiz(quiz: Quiz){
		    const body = JSON.stringify(quiz);
			const headers = new Headers({'content-type': 'application/json'});
			return this.http.post('http://localhost:3000/quiz/ajouterQuiz', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));

	}

	getAllQuizSerie(id){
		 const body = JSON.stringify({"idSerie": id});
		 const headers = new Headers({'content-type': 'application/json'});
	     return this.http.post('http://localhost:3000/quiz/getAllQuizSerie', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));


	}

	modifierQuiz(id,quiz: Quiz){
		const body = JSON.stringify({quiz,"idQuiz": id});
		 const headers = new Headers({'content-type': 'application/json'});
	     return this.http.post('http://localhost:3000/quiz/modifierQuiz', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	supprimerQuiz(id){
		const body = JSON.stringify({"idQuiz": id});
		 const headers = new Headers({'content-type': 'application/json'});
	     return this.http.post('http://localhost:3000/quiz/supprimerQuiz', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}

	findQuiz(id){
		 const body = JSON.stringify({"idQuiz": id});
		 const headers = new Headers({'content-type': 'application/json'});
	     return this.http.post('http://localhost:3000/quiz/findQuiz', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((response: Response) => Observable.throw(error.json));
	}
	
}