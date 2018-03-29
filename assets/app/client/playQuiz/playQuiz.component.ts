import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { QuizService } from "../../quiz/quiz.service";
import { PlayQuizService } from "./playQuiz.service";

import { Quiz } from "../../quiz/quiz.model";
import { PlayQuiz } from "./playQuiz.model";


@Component({
    selector: 'app-playquiz',
    templateUrl: './playQuiz.component.html',
    styleUrls: ['./playQuiz.component.css']
})
export class PlayQuizComponent implements OnInit{
	listQuiz = [];
	id_Quiz = [];
	listReponse = [];
	scoreQuiz = 0;
	percent: number;
	
	constructor(private quizService :QuizService,private cd: ChangeDetectorRef, private playQuizService: PlayQuizService){}

	ngOnInit(){
		//C'est l'id de série
		this.id = "5a912efc3d01942b6ca95b10";
		this.scoreQuiz = 0;
		this.percent =10;
		 this.quizService.getAllQuizSerie(this.id).subscribe(
			data =>{ 
					console.log("aussi la data");
					console.log(data);
					const i =0;
					for(i=0; i<data.object.length; i++){
						const quiz = new Quiz(
							data.object[i].question,
							data.object[i].image,
							data.object[i].reponse1,
							data.object[i].reponse2,
							data.object[i].reponse3,
							data.object[i].repCorrect,
							data.object[i].idSerie
						);
						this.listReponse[i] = null;
						this.listQuiz[i]= quiz;
						this.id_Quiz[i] = data.object[i]._id;
					}
						this.slideIndex = 1;
        				this.showSlides(this.slideIndex);
        				console.log("la liste de quiz");
						console.log(this.listQuiz);
						console.log("la lise de reponse!!!");
						console.log(this.listReponse);
					},
			error => console.log(error)
		);

		

	}

   plusSlides(n) {
	  this.showSlides(this.slideIndex += n);
	  var circleProg = document.getElementById("circleProg");
	   this.cd.detectChanges();
	 	this.percent+= 30;

	  //circleProg.percent = 20;
	}


   currentSlide(n) {
  	this.showSlides(this.slideIndex = n);
   }


  showSlides(n) {
  	console.log("on va afficher les sliders !!!");
 	 var i;
 	 this.cd.detectChanges();
  	var slides = document.getElementsByClassName("mySlides");
  	if (n > slides.length) {this.slideIndex = 1 ; this.avoirResultat();}    
  	if (n < 1) {this.slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
	      slides[i].style.display = "none";  
	  }
	 
	  slides[this.slideIndex-1].style.display = "block";  
	 
	}

	reponseQuiz(j){
    console.log("malek"+j);
      var boutons = document.getElementsByName("reponse");
      for(var i = 0; i < boutons.length; i++){
         if(boutons[i].checked){
         this.correctButton = boutons[i].value;
         }
      }
      this.listReponse[j] = this.correctButton;
      console.log(this.listReponse);
      console.log(this.correctButton);
   
 	}

 	avoirResultat(){
 		console.log("on a terminer maintenant!!!!");
 			var currentTime = new Date();
 			var month = ("0" + (currentTime.getMonth()+1)).slice(-2);
		    var day = ("0" + currentTime.getDate()).slice(-2);
		    var year = currentTime.getFullYear();

		    var hour = ("0" + currentTime.getHours()).slice(-2);
		    var minute = ("0" + currentTime.getMinutes()).slice(-2);
		    var dt = day + "/"+ month + "/" + year + " "+ hour+":"+minute;
 		for(var i=0;i<this.listQuiz.length;i++){
 			if(this.listQuiz[i].repCorrect === this.listReponse[i]){
 				this.scoreQuiz +=1;
 				console.log("il ya une reponse correct!!!");
 			}
 		}
 		console.log("le score est :"+this.scoreQuiz);
 		for(var i=0;i<this.listQuiz.length;i++){
 				const play = new PlayQuiz();
 				play.reponseChoisi = this.listReponse[i];
 				play.idSerie = this.id;
 				play.idQuiz = this.id_Quiz[i];
 				play.score = this.scoreQuiz;
 				play.dateReponse = dt;
 				play.idUser = null;
 				console.log(play);
 				this.playQuizService.ajouterReponse(play).subscribe(
 						data => console.log(data),
 						error => console.log(error)
 				);

 		}
 		
 	}
}