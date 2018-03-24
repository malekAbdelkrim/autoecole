import { Component , OnInit, ChangeDetectorRef } from '@angular/core';
import { Quiz } from "./quiz.model";
import { QuizService } from "./quiz.service";
import { Router , ActivatedRoute} from "@angular/router";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Http, Headers, Response, RequestOptions, ResponseContentType} from "@angular/http";


@Component({
    selector: 'app-updatequiz',
    templateUrl: './updateQuiz.component.html'
})
export class UpdateQuizComponent implements OnInit{
	myForm: FormGroup;
	reponse1 ='';
	reponse2 ='';
	reponse3 ='';
	updateQuiz = false;

	constructor(private quizService :QuizService, private router: Router, private activatedRoute: ActivatedRoute,private http: Http, private cd: ChangeDetectorRef){}

	ngOnInit(){

	 this.sub = this.activatedRoute.params.subscribe(params => {

       this.idSerie = params['id'];
        this.idQuiz = params['id2'];
       
    });
    if(this.idQuiz === "nouveau"){
    	this.updateQuiz = false;
    }else{
    	this.updateQuiz = true;
    	this.quizService.findQuiz(this.idQuiz).subscribe(
    		data => {
    					console.log(data);
    					document.getElementById("question").value = data.object.question ;
    					document.getElementById("rep1").value = data.object.reponse1 ;
    					this.reponse1 = data.object.reponse1 ;

    					document.getElementById("rep2").value = data.object.reponse2 ;
    					this.reponse2 = data.object.reponse2 ;

    					document.getElementById("rep3").value = data.object.reponse3 ;
    					this.reponse3 = data.object.reponse3 ;
    					this.imageQuiz = data.object.image ;
    					 this.correct = data.object.repCorrect ;

    					this.cd.detectChanges();

    					if(data.object.repCorrect === data.object.reponse1){
    							document.getElementById("rep1corr").checked = true;
    					}

    					if(data.object.repCorrect === data.object.reponse2){
    							document.getElementById("rep2corr").checked = true;
    					}

    					if(data.object.repCorrect === data.object.reponse3){
    							document.getElementById("rep3corr").checked = true;
    					}
    					},
    		error => console.log(error);
    	);
    }
	this.myForm = new FormGroup({
					question : new FormControl(null),
					image : new FormControl(null),
					rep1 : new FormControl(null),
					rep2 : new FormControl(null),
					rep3 : new FormControl(null)

			});
    }

  getReponse1(){
  		this.reponse1 = document.getElementById("rep1").value;
  }

   getReponse2(){
  		this.reponse2 = document.getElementById("rep2").value;
  }

   getReponse3(){
  		this.reponse3 = document.getElementById("rep3").value;
  }

  getChoix(){
		
		  var boutons = document.getElementsByName("correct");
		 	for(var i = 0; i < boutons.length; i++){
				 if(boutons[i].checked){
				 this.correctButton = boutons[i].value;
				 }
			}

			if(this.correctButton === "rep1corr"){
				this.correct = this.reponse1;
			}
			if(this.correctButton === "rep2corr"){
				this.correct = this.reponse2;
			}
			if(this.correctButton === "rep3corr"){
				this.correct = this.reponse3;
			}
			console.log(this.correct);
 }

upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    this.imageQuiz = "/images/quiz/"+ files[0].name;
    console.log(this.imageQuiz);
   	this.ext = files[0].name.split(".")[1].toLowerCase();
    console.log(this.ext);
    if(this.ext == "png" || this.ext == "gif" || this.ext == "jpg" || this.ext == "jpeg"){
        formData.append("uploads[]", files[0], files[0]['name']);
   		console.log(formData.toString());
    	console.log('form data variable :   '+ formData.toString());
        this.http.post('http://localhost:3000/quiz/upload_imgquiz', formData)
        .map(files => files.json())
        .subscribe(files => 
        					console.log('files', files); 
        					this.isUpload= true;
        					console.log(this.imageQuiz);
        					
        					);
    } else{
     alert("Attention les images au format '"+this.ext+"' ne sont pas autorisées !\n");
    }
    console.log(this.isUpload);	
   }

	fileChangeEvent(fileInput: any) {
	    this.filesToUpload = <Array<File>>fileInput.target.files;
	    //this.product.photo = fileInput.target.files[0]['name'];
	}

	onSubmit(){

		const quiz = new Quiz(
			 document.getElementById("question").value,
			 this.imageQuiz,
			 this.reponse1,
			 this.reponse2,
			 this.reponse3,
			 this.correct,
			 this.idSerie
		);
		console.log(quiz);
		if(this.updateQuiz == false){
			this.quizService.ajouterQuiz(quiz).subscribe(
			data => {
						console.log(data);
					    this.router.navigate(['/serieQuiz', this.idSerie]);

					},
			error => console.log(error)
		);
		}else{
			this.quizService.modifierQuiz(this.idQuiz,quiz).subscribe(
				data => {
						console.log(data);
						 this.router.navigate(['/serieQuiz', this.idSerie]);
				},
				error => console.log(error)

			);
		}
		
	}

	
}