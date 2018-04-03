import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { QuizService } from "../../quiz/quiz.service";
import { PlayQuizService } from "./playQuiz.service";

import { Quiz } from "../../quiz/quiz.model";
import { PlayQuiz } from "./playQuiz.model";
import { Router , ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-consulerreponse',
    templateUrl: './consulterReponse.component.html',
    styleUrls: ['./playQuiz.component.css']
})
export class ConsulterReponseComponent implements OnInit{
	
	constructor(private quizService :QuizService,private cd: ChangeDetectorRef, private playQuizService: PlayQuizService,private activatedRoute: ActivatedRoute, private router: Router){}

	ngOnInit(){
			//Apartir de local Storage
			this.idUser = null;
			 this.sub = this.activatedRoute.params.subscribe(params => {

      					 this.idSerie = params['id'];
        
       
   				 });
			//this.idSerie = "5abf50e2076b2c1534405b73";
			this.listQuiz = [];
			this.listReponse = [];
			 this.quizService.getAllQuizSerie(this.idSerie).subscribe(
					data =>{
						for(var i=0; i<data.object.length; i++){
						const quiz = new Quiz(
							data.object[i].question,
							data.object[i].image,
							data.object[i].reponse1,
							data.object[i].reponse2,
							data.object[i].reponse3,
							data.object[i].repCorrect,
							data.object[i].idSerie
						);
						this.listQuiz[i]= quiz;
						
					}
						this.slideIndex = 1;
        				this.showSlides(this.slideIndex);
        				console.log("la liste de quiz");
						console.log(this.listQuiz);
						
					}
			);
			this.playQuizService.getScoreSerie(this.idUser,this.idSerie).subscribe(
					data => {
							console.log(data);
							for(var i=0;i<data.object.length;i++){
								this.listReponse[i] = data.object[i].reponseChoisi;
								if(i==1){
									this.listReponse[i] = null;
								}
							}

							},
					error => console.log(error)
			);
	}

	plusSlides(n) {
	  this.showSlides(this.slideIndex += n);
	}


   currentSlide(n) {
  	this.showSlides(this.slideIndex = n);
   }


  showSlides(n) {
  	console.log("on va afficher les sliders !!!");
 	 var i;
 	 this.cd.detectChanges();
  	var slides = document.getElementsByClassName("mySlides");
  	if (n > slides.length) {this.slideIndex = 1}    
  	if (n < 1) {this.slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
	      slides[i].style.display = "none";  
	  }
	 
	  slides[this.slideIndex-1].style.display = "block";  
	 
}

avoirReponseIncorrect(i,j){
	if(this.listReponse[i] === this.listQuiz[i].repCorrect){
		return false;
	}else{
		if(this.listReponse[i] === this.listQuiz[i].reponse1 & j===1){
			return true;
		}else{
			return false;
		}

		if(this.listReponse[i] === this.listQuiz[i].reponse2 & j===2){
			return true;
		}else{
			return false;
		}

		if(this.listReponse[i] === this.listQuiz[i].reponse3 & j===3){
			return true;
		}else{
			return false;
		}
	}
}
}