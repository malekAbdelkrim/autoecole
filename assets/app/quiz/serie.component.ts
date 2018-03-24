import { Component , OnInit } from '@angular/core';
import { Quiz } from "./quiz.model";
import { QuizService } from "./quiz.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-serie',
    templateUrl: './serie.component.html'
})
export class SerieComponent implements OnInit{
	addSerie: Boolean = false;
	listSerie = [];
	id_listSerie = [];
	
	
	constructor(private quizService :QuizService, private router: Router){}

	ngOnInit(){


			this.quizService.getAllSerie().subscribe(
				data => {
							console.log(data);
							const i =0;
							for(i=0;i<data.object.length;i++){
								this.listSerie[i] = data.object[i].titreSerie;
								this.id_listSerie[i] = data.object[i]._id;
							}
							console.log(this.listSerie);
							console.log(this.id_listSerie);

							},
				error => console.log(error)
			);
	}

	ajouterSerie(){
		this.addSerie = true;
	}

	ajouterNvSerie(){
		const titreSerie = document.getElementById("titreSerie").value;
		this.quizService.ajouterSerie(titreSerie).subscribe(
				data => {
					console.log(data);
					this.listSerie[this.listSerie.length] = data.obj.titreSerie;
					this.id_listSerie[this.id_listSerie.length] = data.obj._id;
					this.addSerie = false;

				},
				error => console.log(error)
			);

	}

	supprimerSerie(i){
		this.quizService.supprimerSerie(this.id_listSerie[i]).subscribe(
				data => {
					console.log(data);
					 this.listSerie.splice(i, 1);
					 this.id_listSerie.splice(i, 1);
					this.addSerie = false;

				},
				error => console.log(error)
			);
	}

	goToUpdateSerie(i){
		this.router.navigate(['/serieQuiz', this.id_listSerie[i]]);
	}

}