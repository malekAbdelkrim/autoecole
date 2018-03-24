import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { ContratService } from "./contrat.service";
import { Contrat } from "./contrat.model";
import { User } from "./user.model";
import { Pack } from "./pack.model";
import { Paiement } from "./paiement.model";
import { Router , ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-detailcontrat',
    templateUrl: './detailContrat.component.html',
    styleUrls: ['./detailContrat.component.css']
})



export class DetailContratComponent implements OnInit{
	idContrat;
	contrat;
	listPackContrat;
	pack;
	existPromo = false;
	tranche;
	listPaiement;
	paiementTotal;
	restePaiement;
	constructor(private contratService: ContratService,private activatedRoute: ActivatedRoute,private cd: ChangeDetectorRef,private router: Router){}

	ngOnInit(){
	    this.paiementTotal = 0;
		this.restePaiement = 0;
		this.tranche = 0;
		this.listPackContrat = [];
		this.listPaiement = [];
	    this.sub = this.activatedRoute.params.subscribe(params => {
	       this.idContrat = params['id'];
	    });
		this.contratService.getInfoContrat(this.idContrat).subscribe(
				data =>{ 
							console.log(data);
							this.contrat = new Contrat();
							this.contrat.nomComplet = data.object.nomUtilisateur;
							this.contrat.CIN = data.object.CIN;
							this.contrat.email = data.object.email;
							this.contrat.dateInscription = data.object.date_inscription;
							this.contrat.nbHeureCodeSupp = data.object.nbHeureCodeSupp;
							this.contrat.nbHeureCodeTotal = data.object.nbHeureCodeTotal;
							this.contrat.telephone = data.object.telephone;

							this.contrat.nbHeureConduitSupp = data.object.nbHeureConduitSupp;
							this.contrat.nbHeureConduitTotal = data.object.nbHeureConduitTotal;
							this.contrat.prixTotal = data.object.totalPrix;
							this.contrat.prixTotalApresPromo = data.object.totalPrixApresPromo;
							if(data.object.idPromo === null || data.object.idPromo === undefined){
								this.existPromo = false;
								this.restePaiement = data.object.totalPrix;
							}else{
								this.existPromo = true;
								this.restePaiement =  data.object.totalPrixApresPromo;
							}
							console.log("le contrat est :");
							console.log(this.contrat);


							},
				error => console.log(error)
		);

		this.contratService.getPackContrat(this.idContrat).subscribe(
				data => {
							console.log(data);
							for(var i=0;i<data.object.length;i++){
								this.contratService.getInfoPack	(data.object[i].idPack).subscribe(
									data => {

										console.log("les details de pack");
										console.log(data);
										this.pack = new Pack();
										this.pack.titre = data.object.titre;
										this.pack.description = data.object.description;
										
										this.listPackContrat[this.listPackContrat.length] = this.pack;
										console.log("la liste depack contrat :");
										console.log(this.listPackContrat);
									},
									error => console.log(error)
									
								);
								console.log(this.pack);
								console.log("i = "+i);
							}
							console.log(this.listPackContrat);

							},
				error => console.log(error)
		);

		this.contratService.getAllPaiement(this.idContrat).subscribe(
				data => {
							console.log(data);
							for(var i=0; i<data.object.length;i++){
								const paie = new Paiement();
								paie.idContrat = data.object[i].idContrat;
								paie.tranche = data.object[i].tranche;
								paie.datePaiement = data.object[i].datePaiement;
								this.listPaiement[this.listPaiement.length] = paie;
								this.paiementTotal += data.object[i].tranche;
								this.restePaiement -= data.object[i].tranche;
							}
							console.log(this.listPaiement);
							},
				error => console.log(error)

		);

		var modal = document.getElementById('myModal');

		// Get the button that opens the modal
		var btn = document.getElementById("myBtn");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		//Get btn ajouter tranche
		var btnTranche = document.getElementById("tranche");

		// When the user clicks the button, open the modal 
		btn.onclick = function() {
		    modal.style.display = "block";
		}

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}

		var btnTranche = document.getElementById("addTranche");
		btnTranche.onclick = function() {
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		/*window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "block";
		    }
		}*/
		 var inputTrance = document.getElementById("tranche");
		 inputTrance.onclick = function() {
		    modal.style.display = "bloc";
		}



	}

	ajouterTranche(){
		console.log("malek abdel!!!");
		 this.tranche = parseFloat(document.getElementById("tranche").value);
		 var paie = new Paiement();
		 paie.tranche = this.tranche;
		 paie.idContrat = this.idContrat;
		 var currentTime = new Date();
		 var month = ("0" + (currentTime.getMonth()+1)).slice(-2);
		 var day = ("0" + currentTime.getDate()).slice(-2);
		 var year = currentTime.getFullYear();

		 var hour = ("0" + currentTime.getHours()).slice(-2);
		 var minute = ("0" + currentTime.getMinutes()).slice(-2);
		 var dt = day + "/"+ month + "/" + year + " "+ hour+":"+minute;
		 paie.datePaiement = dt;
		 console.log(paie);
		 this.contratService.ajouterTranche(paie).subscribe(
		 		data => {
		 				console.log(data);
		 				this.listPaiement[this.listPaiement.length] = paie;
		 				this.paiementTotal += paie.tranche;
		 				this.restePaiement -= paie.tranche;
		 		},
		 		error => console.log(error)
		 );



	}

	supprimerTranche(i){
		this.contratService.supprimerTranche(this.listPaiement[i].idContrat).subscribe(
			data => {
				console.log(data),
				this.paiementTotal -= this.listPaiement[i].tranche;
				this.restePaiement += this.listPaiement[i].tranche;
				this.listPaiement.splice(i, 1);

			}
		);
		console.log("malek :"+i);
	}
}