import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { QuizService } from "../../quiz/quiz.service";
import { PlayQuizService } from "./playQuiz.service";

import { Quiz } from "../../quiz/quiz.model";
import { PlayQuiz } from "./playQuiz.model";
import { Router , ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-serieplay',
    templateUrl: './seriePlay.component.html',
    styleUrls: ['./playQuiz.component.css']
})
export class SeriePlayComponent implements OnInit{
	
	constructor(private quizService :QuizService,private cd: ChangeDetectorRef, private playQuizService: PlayQuizService,private activatedRoute: ActivatedRoute, private router: Router){}

	ngOnInit(){
		this.listPlaySerie = [];
		
		this.quizService.getAllSerie().subscribe(
				data => {
							console.log(data);
							for(var i=0;i<data.object.length;i++){
								const play = new PlayQuiz();
								play.idSerie =  data.object[i]._id;
								play.titreSerie = data.object[i].titreSerie;
								play.idUser= this.idUser;
								
								this.playQuizService.getScoreSerie(this.idUser,data.object[i]._id).subscribe(
											data =>{
													 console.log(data);
													 if(data.object.length>0){
													 	 play.score = data.object[0].score;
													     play.dateReponse = data.object[0].dateReponse;
													 }
													 },
											error => console.log(error)
								);
								this.listPlaySerie[i] = play;
							}

							},
				error => console.log(error)
		);

	}

	jouerSerie(i){
		console.log(this.listPlaySerie[i].idSerie);
			this.router.navigate(['/playQuiz',this.listPlaySerie[i].idSerie]);
	}

	voirReponse(i){
		this.router.navigate(['/votreReponse',this.listPlaySerie[i].idSerie]);
	}


}