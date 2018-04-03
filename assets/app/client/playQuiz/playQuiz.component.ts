import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { QuizService } from "../../quiz/quiz.service";
import { PlayQuizService } from "./playQuiz.service";

import { Quiz } from "../../quiz/quiz.model";
import { PlayQuiz } from "./playQuiz.model";
import { Router , ActivatedRoute} from "@angular/router";


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
	
	constructor(private quizService :QuizService,private cd: ChangeDetectorRef, private playQuizService: PlayQuizService,private activatedRoute: ActivatedRoute, private router: Router){}

	ngOnInit(){
		//C'est l'id de série
		 this.sub = this.activatedRoute.params.subscribe(params => {

      					 this.id = params['id'];
       
   			 });
		//this.id = "5abf50e2076b2c1534405b73";

		//A partir de localStorage
		this.idUser = null;

		this.scoreQuiz = 0;
		this.updatePlay = false;

		console.log(this.id);
		  this.quizService.getAllQuizSerie(this.id).subscribe(
			data =>{ 
					console.log("aussi la data");
					console.log(data);
					const i =0;
					console.log("le reste est :"+ Math.floor(100%data.object.length));
					this.percent =Math.floor(100%data.object.length);
					this.ajouterPer = (100-Math.floor(100%data.object.length))/data.object.length;
					console
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

		this.playQuizService.getScoreSerie(this.idUser,this.id).subscribe(
				data => {
							console.log(data);
							if(data.object.length>0){
								this.updatePlay = true;
							}
							},
				error => console.log(error)
		);

	}

   plusSlides(n) {
	  this.showSlides(this.slideIndex += n);
	  var circleProg = document.getElementById("circleProg");
	   this.cd.detectChanges();
	 	this.percent+= this.ajouterPer;

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
  	if (n > slides.length) {this.avoirResultat();}    
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
 		if(this.updatePlay === true){
 			this.playQuizService.removeAllQuiz(this.idUser,this.id).subscribe(
 					data=>{
 							console.log(data);
 							for(var i=0;i<this.listQuiz.length;i++){
					 				const play = new PlayQuiz();
					 				play.reponseChoisi = this.listReponse[i];
					 				play.idSerie = this.id;
					 				play.idQuiz = this.id_Quiz[i];
					 				play.score = this.scoreQuiz;
					 				play.dateReponse = dt;
					 				play.idUser = this.idUser;
					 				console.log(play);
					 				this.playQuizService.ajouterReponse(play).subscribe(
					 						data => {
					 									console.log(data);
					 									console.log("i="+i);
					 									if(i=== this.listQuiz.length){
					 										console.log("on va afficher le popup");
					 										this.affichagePopup();
					 										//this.router.navigate(['/playQuiz']);
					 									}
					 									},
					 						error => console.log(error)
					 				);
					 		}


 							},
 					error => console.log(error)
 			);

 		}else{
 				for(var i=0;i<this.listQuiz.length;i++){
					 				const play = new PlayQuiz();
					 				play.reponseChoisi = this.listReponse[i];
					 				play.idSerie = this.id;
					 				play.idQuiz = this.id_Quiz[i];
					 				play.score = this.scoreQuiz;
					 				play.dateReponse = dt;
					 				play.idUser = this.idUser;
					 				console.log(play);
					 				this.playQuizService.ajouterReponse(play).subscribe(
					 						data => {
					 									console.log(data);
					 									console.log("i="+i);
					 									if(i=== this.listQuiz.length){
					 										console.log("on va afficher le popup");
					 										this.affichagePopup();
					 									}
					 									},
					 						error => console.log(error)
					 				);
					 		}

 		}
 		
 		
 	}

 	affichagePopup(){
 		var modal = document.getElementById('myModal');
 		var span = document.getElementsByClassName("close")[0];
 		if(this.scoreQuiz>1){
 				document.getElementById("msg1").innerHTML = "Félicitation !!!";
 				document.getElementById("msg2").innerHTML = "Vous avez la note de "+this.scoreQuiz+"/30";
 				 modal.style.display = "block";
 				 /*span.onclick = (() =>
 				  	console.log("malek1");
				    modal.style.display = "none";
				    console.log("malek2");
				    this.router.navigate(['/playQuiz']);
				   );*/
 		} else{
 			    document.getElementById("msg1").innerHTML = "Ouups !!!";
 				document.getElementById("msg2").innerHTML = "Désolé, votre note est"+this.scoreQuiz+"/30";
 				 modal.style.display = "block";
 				  /*span.onclick = (() =>
 				  	console.log("malek1");
				    modal.style.display = "none";
				    console.log("malek2");
				     this.router.navigate(['/playQuiz']);
				    );*/
 		}
 	}

	colsePopup(){
		this.router.navigate(['/playQuiz']);
	}
 
}