import { Component, OnInit } from "@angular/core";
import { AutoEcoleService } from "./autoecole.service";
import { Professeur } from "./professeur.model";
import { Router } from "@angular/router";

@Component({
	selector: 'app-professeur'
	templateUrl: './professeur.component.html'
})
export class ProfesseurComponent implements OnInit{
		private nbColonne = [1,2,3];
		private nbRow = [];
		i: Number;
		listProf = [];
		listIdProf= [];

		constructor(private autoEcoleService: AutoEcoleService, private router: Router){}
		ngOnInit(){
			this.autoEcoleService.getProf().subscribe(
				data =>{ 
				         console.log(data);
				         for(this.i=0;this.i<data.object.length;this.i++){
				         	const prof = new Professeur(
				         					data.object[this.i].nom,
				         					data.object[this.i].prenom,
				         					data.object[this.i].CIN,
				         					data.object[this.i].img,
				         					data.object[this.i].type_cours,
				         					data.object[this.i].description,
				         					data.object[this.i].date_depart,
				         					data.object[this.i].adresse,
				         					data.object[this.i].telephone,
				         					data.object[this.i].email
				         	);
				         	this.listProf[this.i] = prof;
				         	this.listIdProf[this.i]= data.object[this.i]._id;
				         }
				         console.log(this.listIdProf);

				         for(this.i=0; this.i<Math.floor(this.listProf.length/3)+1; this.i++){
				         	this.nbRow[this.i] = this.i+1;
				         }
				         console.log(this.nbRow);
				         },
				error => console.log(error)
			);
		}
		
		removeProf(id){
		   console.log(this.listIdProf[id]);
			if(confirm("Voulez-vous supprimer ce professeur!!")){
				const idProf = this.listIdProf[id];
				this.autoEcoleService.removeProf(idProf).subscribe(
						data => {console.log(data);
								 localStorage.removeItem("idProf");
								this.router.navigate(['/auto', 'profAuto']);},
						error => console.log(error)
				);
			}
		}



		updateProf(id){
			localStorage.setItem('idProf',this.listIdProf[id]);
			this.router.navigate(['/auto', 'updateProf']);

		}

		ajouterProf(){
			this.router.navigate(['/auto', 'updateProf']);

		}
}