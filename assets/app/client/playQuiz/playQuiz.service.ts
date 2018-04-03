import { Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { PlayQuiz } from "./playQuiz.model";
@Injectable()

export class PlayQuizService{
constructor(private http: Http){}

	ajouterReponse(play: PlayQuiz){
			 const body = JSON.stringify(play);
			 const headers = new Headers({'content-type': 'application/json'});
			 return this.http.post('http://localhost:3000/playQuiz/ajouterReponse', body, {headers: headers})
					 .map((response: Response) => response.json())
					 .catch((response: Response) => Observable.throw(error.json));
	}

	/*findPlayQuiz(idUser,idSerie){
	      const body = JSON.stringify({'idUser':idUser,'idSerie':idSerie});
		  const headers = new Headers({'content-type': 'application/json'});
		  return this.http.post('http://localhost:3000/playQuiz/findPlayQuiz', body, {headers: headers})
					 .map((response: Response) => response.json())
					 .catch((response: Response) => Observable.throw(error.json));
	}*/

	getScoreSerie(idUser,idSerie){
		   const body = JSON.stringify({'idUser':idUser,'idSerie':idSerie});
		  const headers = new Headers({'content-type': 'application/json'});
		  return this.http.post('http://localhost:3000/playQuiz/getScoreSerie', body, {headers: headers})
					 .map((response: Response) => response.json())
					 .catch((response: Response) => Observable.throw(error.json));
	}

	removeAllQuiz(idUser,idSerie){
	 		const body = JSON.stringify({'idUser':idUser,'idSerie':idSerie});
		  const headers = new Headers({'content-type': 'application/json'});
		  return this.http.post('http://localhost:3000/playQuiz/removeAllQuiz', body, {headers: headers})
					 .map((response: Response) => response.json())
					 .catch((response: Response) => Observable.throw(error.json));
	}

}