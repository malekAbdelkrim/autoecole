import { Component , OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked} from '@angular/core';
import { Quiz } from "./quiz.model";
import { QuizService } from "./quiz.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";




@Component({
    selector: 'app-quizSerie',
    templateUrl: './quizSerie.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizSerieComponent implements OnInit,AfterViewInit,AfterViewChecked{
	
	updateQuiz = false;
	listQuiz = [];
	id_Quiz = [];
	
	constructor(private quizService :QuizService, private router: Router, private activatedRoute: ActivatedRoute,private http: Http,private cd: ChangeDetectorRef){}

	ngAfterViewInit(){
		//this.showSlides(this.slideIndex);
		
	}

	ngOnInit() {
	
    this.sub = this.activatedRoute.params.subscribe(params => {
       this.id = params['id'];
       
    });

    this.quizService.getAllQuizSerie(this.id).subscribe(
			data =>{ 
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
						this.listQuiz[i]= quiz;
						this.id_Quiz[i] = data.object[i]._id;
					}
						this.slideIndex = 0;
        this.showSlides(this.slideIndex);
					console.log(this.listQuiz);
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
  	var dots = document.getElementsByClassName("dot");
  	if (n > slides.length) {this.slideIndex = 1}    
  	if (n < 1) {this.slideIndex = slides.length}
	  for (i = 0; i < slides.length; i++) {
	      slides[i].style.display = "none";  
	  }
	  for (i = 0; i < dots.length; i++) {
	      dots[i].className = dots[i].className.replace(" active", "");
	  }
	  slides[this.slideIndex-1].style.display = "block";  
	  dots[this.slideIndex-1].className += " active";
}


	modifierQuiz(i){
		this.router.navigate(['/updateQuiz', this.id, this.id_Quiz[i]);
	}
	supprimerQuiz(i){

		this.quizService.supprimerQuiz(this.id_Quiz[i]).subscribe(
			data => {
						console.log(data);
						this.listQuiz.splice(i, 1);
					    this.id_Quiz.splice(i, 1);
						console.log(this.listQuiz);

					},
			error => console.log(error)
		);

	}

	ajouterQuiz(){
		this.router.navigate(['/updateQuiz', this.id, 'nouveau');
	}

}