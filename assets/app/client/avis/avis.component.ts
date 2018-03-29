import { Component , OnInit } from '@angular/core';
import { Avis } from "./avis.model";
import { AvisService } from "./avis.service";

@Component({
    selector: 'app-avis',
    templateUrl: './avis.component.html',
    styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit{
	nbEtoile;
	listAvis;
	listIdAvis;
	
	constructor(private avisService : AvisService){}
	ngOnInit(){
		this.nbEtoile = 0;
		this.listAvis = [];
		this.listIdAvis = [];
		this.posAvis = 0;
		this.updateAvis= false;
		this.avisService.findAllAvis().subscribe(
			data => {
					console.log(data);
					for(var i=0;i<data.object.length;i++){
						const avis = new Avis();
						avis.commentaire = data.object[i].commentaire;
						avis.nbVoiture = data.object[i].nbVoiture;
						avis.dateCommentaire = data.object[i].dateCommentaire;
						avis.idUser = data.object[i].idUser;
						this.listAvis[this.listAvis.length] = avis;
						this.listIdAvis[this.listIdAvis.length] = data.object[i]._id;
					}
						console.log(this.listAvis);
						console.log(this.listIdAvis);
					},
			error => console.log(error)
		);

		var modal = document.getElementById('myModal');

		// Get the button that opens the modal
		var btn = document.getElementById("myBtn");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		btn.onclick = function() {
		     modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}

	}

	ajouterAvis(){
		console.log("on a donné notre avis!!");
		const avis = new Avis();
		var currentTime = new Date();
		var month = ("0" + (currentTime.getMonth()+1)).slice(-2);
	    var day = ("0" + currentTime.getDate()).slice(-2);
	    var year = currentTime.getFullYear();

	    var hour = ("0" + currentTime.getHours()).slice(-2);
	    var minute = ("0" + currentTime.getMinutes()).slice(-2);
	    var dt = day + "/"+ month + "/" + year + " "+ hour+":"+minute;

		avis.commentaire = document.getElementById("avis").value;
		avis.nbVoiture =  this.nbEtoile;
		avis.dateCommentaire = dt;
		avis.idUser =null;
		console.log(avis);
		if(this.updateAvis){
			this.avisService.modifierAvis(this.listIdAvis[this.posAvis],avis).subscribe(
					data => {
								console.log(data);
								this.listAvis[this.posAvis] = avis;
								this.updateAvis = false;
								var modal = document.getElementById('myModal');
								modal.style.display = "none";
								console.log("update est :"+this.updateAvis);
								for(var j=0;j<5;j++){
									document.getElementById("voiture"+j).src = "/images/avis/car.png";
							    }
								document.getElementById("avis").value = "";

								},
					error => console.log(error)
			);
		}else{
			this.avisService.ajouterAvis(avis).subscribe(
				data => {
							console.log(data);
							this.listAvis[this.listAvis.length] = avis;
							var modal = document.getElementById('myModal');
							modal.style.display = "none";
							for(var j=0;j<5;j++){
								document.getElementById("voiture"+j).src = "/images/avis/car.png";
							}
							document.getElementById("avis").value = "";
						},
				error => console.log(error)
		);

		}
	}
	getNbVoiture(i){
		for(var j=0;j<5;j++){
			document.getElementById("voiture"+j).src = "/images/avis/car.png";
		}
		
		for(var j=0;j<i+1;j++){
			document.getElementById("voiture"+j).src = "/images/avis/carSele.png";
		}
		
		console.log("nbEtoile :"+i);
		this.nbEtoile = i+1;
		
	}

	modifierAvis(i){
			console.log("on modifie :"+i);
			this.posAvis = i;
			this.nbEtoile = this.listAvis[i].nbVoiture;
			this.getNbVoiture(this.listAvis[i].nbVoiture-1);
			document.getElementById("avis").value = this.listAvis[i].commentaire;
			var modal = document.getElementById('myModal');
			modal.style.display = "block";
			this.updateAvis = true;

	}

	supprimerAvis(i){
		this.avisService.supprimerAvis(this.listIdAvis[i]).subscribe(
				data => {
							console.log(data),
							this.listAvis.splice(i, 1);
							},
				error => console.log(error)
		);
	}
}