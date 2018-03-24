import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { PromotionService } from "./promotion.service";
import { NouveauPack } from "./nvPack.model";
import { PrixHeureCodeConduit } from "./prixHeureCodeConduit.model";
import { ArgentPourcentage } from "./argentPourcentage.model";
import { RemiseSurPack } from "./remiseSurPack.model";
import { Promo } from "./promo.model";
import { PersonneReduction } from "./personneReduction.model";
import { Router } from "@angular/router";

import { Http, Headers, Response } from "@angular/http";



@Component({
	selector: 'app-promotion',
	templateUrl: './promotion.component.html'
})

export class PromotionComponent implements OnInit{
	myForm: FormGroup;
	choix: any;
	imagePromo: String;
	updatePromo = false;
	argentPourcentage: ArgentPourcentage[] = [];
	personneReduction: PersonneReduction[] = [];
	detailsPromo: String[] = []
	id_argentPourcentage = [];
	id_personneReduction = [];
	id_detailPromo = [];

	//Les illimités qui concerne ArgentReduction
	inputPrix2 = true;
    prix2: String;

    //Les illimités qui concerne PersonneReduction
    inputPersonne2 = true;
    nbPersonne2: String;

    constructor(private promotionService: PromotionService, private http: Http, private cd: ChangeDetectorRef, private router: Router){}

	ngOnInit(){

		//idPromo c'est à dire qu'on une promotion à ce moment

		if(localStorage.getItem('idPromo') !== null){

				this.promotionService.findPromoById().subscribe(
					data =>{
							console.log(data);
							console.log(data.object);
							this.updatePromo = true;  //C'est à dire qu'on va faire la mise à jour de promotion
							this.promotionService.getDetailsPromo(data.object._id).subscribe(
										data => {
												console.log(data);
												const k=0;
												for(k=0;k<data.object.length;k++){
														this.detailsPromo[k] = data.object[k].detail;
														this.id_detailPromo[k]= data.object[k]._id;	
													}

												},
										error => console.log(error)
							);

							if(data.object.nouveau_pack !== undefined){
								this.choix = '1';
								document.getElementById("title").value = data.object.nouveau_pack.titre;
								document.getElementById("description").value =data.object.nouveau_pack.description;
								this.imagePromo=data.object.nouveau_pack.image;
								document.getElementById("date_depart").value = data.object.nouveau_pack.date_depart.substr(0,10);
								document.getElementById("date_exp").value = data.object.nouveau_pack.date_expiration.substr(0,10);
								this.cd.detectChanges();
  								console.log(document.getElementById('nbHeureConduit'));
								document.getElementById("nbHeureConduit").value = data.object.nouveau_pack.nb_heure_code;
								document.getElementById("nbHeureCode").value = data.object.nouveau_pack.nb_heure_conduit;
								document.getElementById("prixPack").value = data.object.nouveau_pack.prix_total;
							}



							if(data.object.pack !== undefined){
								
								this.choix = '2';
								console.log("bonjour malek");
								document.getElementById("title").value = data.object.pack.titre;
								document.getElementById("description").value =data.object.pack.description;
								this.imagePromo=data.object.pack.image;
								document.getElementById("date_depart").value = data.object.pack.date_depart.substr(0,10);
								document.getElementById("date_exp").value = data.object.pack.date_expiration.substr(0,10);
								this.cd.detectChanges();
								document.getElementById("promoPackCode").value = data.object.pack.promoPackCode;
								document.getElementById("promoPackCodeConduit").value = data.object.pack.promoPackConduit;
								document.getElementById("promoPackConduit").value = data.object.pack.promoPackCodeConduit;
							}


							if(data.object.prix_code_conduit !== undefined){
								this.choix = '3';
								console.log(data.object.prix_code_conduit.date_expiration.substr(0,10));
								document.getElementById("title").value = data.object.prix_code_conduit.titre;
								document.getElementById("description").value =data.object.prix_code_conduit.description;
								this.imagePromo=data.object.prix_code_conduit.image;
								document.getElementById("date_depart").value = data.object.prix_code_conduit.date_depart.substr(0,10);
								document.getElementById("date_exp").value = data.object.prix_code_conduit.date_expiration.substr(0,10);
								this.cd.detectChanges();
  								console.log(document.getElementById('prix_code'));
								document.getElementById("prix_code").value = data.object.prix_code_conduit.prix_code;
								document.getElementById("prix_conduit").value = data.object.prix_code_conduit.prix_conduit;
								
							}

							if(data.object.totaliteArgent !== undefined){
								this.choix = '4';
								document.getElementById("title").value = data.object.totaliteArgent.titre;
								document.getElementById("description").value =data.object.totaliteArgent.description;
								this.imagePromo=data.object.totaliteArgent.image;
								document.getElementById("date_depart").value = data.object.totaliteArgent.date_depart.substr(0,10);
								document.getElementById("date_exp").value = data.object.totaliteArgent.date_expiration.substr(0,10);
								this.cd.detectChanges();
  								this.promotionService.getDetailsArgentReduction(data.object._id).subscribe(
								data => {
								console.log(data);
								const k=0;
								for(k=0;k<data.object.length;k++){
									const argentReduc = new ArgentPourcentage(
										data.object[k].prix1,
									    data.object[k].prix2,
									   data.object[k].reduction
									);
									this.argentPourcentage[k]= argentReduc;
									this.id_argentPourcentage[k]= data.object[k]._id;
									
								}
								console.log(this.argentPourcentage);
								},
								error => console.log(error) );
								
							}

							if(data.object.nombrePersonne !== undefined){
								this.choix = '5';
								//console.log(data.object.prix_code_conduit.date_expiration.substr(0,10));
								document.getElementById("title").value = data.object.nombrePersonne.titre;
								document.getElementById("description").value =data.object.nombrePersonne.description;
								this.imagePromo=data.object.nombrePersonne.image;
								document.getElementById("date_depart").value = data.object.nombrePersonne.date_depart.substr(0,10);
								document.getElementById("date_exp").value = data.object.nombrePersonne.date_expiration.substr(0,10);
								this.cd.detectChanges();
  								this.promotionService.getDetailsPersonneReduction(data.object._id).subscribe(
								data => {
								console.log(data);
								const k=0;
								for(k=0;k<data.object.length;k++){
									const personneReduc = new PersonneReduction(
										data.object[k].nbPersonne1,
									    data.object[k].nbPersonne2,
									   data.object[k].reduction
									);
									this.personneReduction[k]= personneReduc;
									this.id_personneReduction[k]= data.object[k]._id;
									
								}
								},
								error => console.log(error) );
							}

							},
					error => console.log(error)
				);
		
	}

		
		this.myForm = new FormGroup({
			title: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			date_depart: new FormControl(null, Validators.required),
			date_exp: new FormControl(null, Validators.required),
			image: new FormControl(null),
			nbHeureConduit: new FormControl(null),
			nbHeureCode: new FormControl(null),
			prixPack: new FormControl(null),
			prix_code: new FormControl(null),
			prix_conduit: new FormControl(null),
			prix1: new FormControl(null),
			prix2: new FormControl(null),
			reduction: new FormControl(null),
			detailPromo: new FormControl(null),
			detailPromoMod: new FormControl(null),
			nbpersonne1 : new FormControl(null),
			nbpersonne2 : new FormControl(null),
			reductionPersonne: new FormControl(null),
			promoPackConduit: new FormControl(null),
			promoPackCode: new FormControl(null),
			promoPackCodeConduit: new FormControl(null)

			

		});
	}


	//Récupére le choix de admin
	getChoix(){
		
		  var sel2 = document.getElementById("choixPromo");
		  this.choix = sel2.options[sel2.selectedIndex].value;
		  console.log(this.choix);
	}

	//On va ajouter ou bien modifier le choix de admin
	onSubmit(){


		if(this.choix == '1'){
			console.log("title:"+ document.getElementById("title").value);
			const nouveauPack = new NouveauPack(
				document.getElementById("title").value,
				document.getElementById("description").value,
				this.imagePromo,
				document.getElementById("date_depart").value,
				document.getElementById("date_exp").value ,
				parseInt(document.getElementById("nbHeureCode").value),
				parseInt(document.getElementById("nbHeureConduit").value),
				parseFloat(document.getElementById("prixPack").value)
			);

			if(this.updatePromo == false)
			{
				this.promotionService.ajouterNvPack(nouveauPack).subscribe(
					data => {
								console.log(data);
								console.log(this.detailsPromo);
							this.promotionService.ajouterDetailsPromotion(this.detailsPromo,data.obj._id).subscribe(
									data => {console.log(data);},
									error => console.log(error));
					   this.router.navigate(['/promo']);
					},
					error => console.log(error) );
			}
			else{
				console.log(nouveauPack);
				this.promotionService.modifierNvPack(nouveauPack).subscribe(
					data => {
								console.log(data);
								localStorage.removeItem("idPromo");
								this.router.navigate(['/promo']);
								//navigation vers la partie accueil},
					error => console.log(error) );
			}	
		}


		if(this.choix === '2'){
			console.log("title:"+ document.getElementById("title").value);
			const remiseSurPack = new RemiseSurPack(
				document.getElementById("title").value,
				document.getElementById("description").value,
				this.imagePromo,
				document.getElementById("date_depart").value,
				document.getElementById("date_exp").value ,
				parseFloat(document.getElementById("promoPackCode").value),
				parseFloat(document.getElementById("promoPackConduit").value),
				parseFloat(document.getElementById("promoPackCodeConduit").value)
			);

			if(this.updatePromo == false)
			{
				this.promotionService.ajouterPromoPack(remiseSurPack).subscribe(
					data => {
								console.log(data);
								console.log(this.detailsPromo);
							this.promotionService.ajouterDetailsPromotion(this.detailsPromo,data.obj._id).subscribe(
									data => {console.log(data);},
									error => console.log(error));
					   this.router.navigate(['/promo']);
					},
					error => console.log(error) );
			}
			else{
				console.log(remiseSurPack);
				this.promotionService.modifierPromoPack(remiseSurPack).subscribe(
					data => {
								console.log(data);
								localStorage.removeItem("idPromo");
								this.router.navigate(['/promo']);
								//navigation vers la partie accueil},
					error => console.log(error) );
			}	
		}

		if(this.choix == '3'){
			
			const prixHeureCodeConduit = new PrixHeureCodeConduit(
				document.getElementById("title").value,
				document.getElementById("description").value,
				this.imagePromo,
				document.getElementById("date_depart").value,
				document.getElementById("date_exp").value ,
				parseFloat(document.getElementById("prix_code").value),
				parseFloat(document.getElementById("prix_conduit").value)
			);
			console.log(prixHeureCodeConduit);

			if(this.updatePromo == false)
			{
				this.promotionService.ajouterPrixHeureCodeConduit(prixHeureCodeConduit).subscribe(
					data => {
								console.log(data);
								 this.promotionService.ajouterDetailsPromotion(this.detailsPromo,data.obj._id).subscribe(
									data => {console.log(data);},
									error => console.log(error)	);
									this.router.navigate(['/promo']);
					},
					error => console.log(error) );
			}
			else{
				
				this.promotionService.modifierPrixHeureCodeConduit(prixHeureCodeConduit).subscribe(
					data => {
								console.log(data);
								localStorage.removeItem("idPromo");
								this.router.navigate(['/promo']);
								//navigation vers la partie accueil},
					error => console.log(error) );
			}	
		}


		if(this.choix == '4'){
			console.log("mon choix");
			const promo = new Promo(
				document.getElementById("title").value,
				document.getElementById("description").value,
				this.imagePromo,
				document.getElementById("date_depart").value,
				document.getElementById("date_exp").value
			);
			console.log(promo);

			if(this.updatePromo == false)
			{
				this.promotionService.ajouterArgentReduction(promo).subscribe(
					data => {
					console.log(data),
					console.log(this.argentPourcentage);
					 this.promotionService.ajouterDetailsPromotion(this.detailsPromo,data.obj._id).subscribe(
							data => {console.log(data);},
							error => console.log(error)
					);
					 this.promotionService.ajouterDetailsArgentReduction(this.argentPourcentage,data.obj._id).subscribe(
							data => {console.log(data);},
							error => console.log(error)
					);
					this.router.navigate(['/promo']);
					},
					error => console.log(error) );
			}
			else{
				
				this.promotionService.modifierArgentReduction(promo).subscribe(
					data => {
								console.log(data);
								this.router.navigate(['/promo'] ;
								//navigation vers la partie accueil},
					error => console.log(error) );
			}
			
			
		}

		if(this.choix == '5'){
			console.log("mon choix");
			const promo = new Promo(
				document.getElementById("title").value,
				document.getElementById("description").value,
				this.imagePromo,
				document.getElementById("date_depart").value,
				document.getElementById("date_exp").value
			);
			console.log(promo);

			if(this.updatePromo == false)
			{
				this.promotionService.ajouterPersonneReduction(promo).subscribe(
					data => {
					console.log(data),
					console.log(this.argentPourcentage);
					 this.promotionService.ajouterDetailsPromotion(this.detailsPromo,data.obj._id).subscribe(
							data => console.log(data),
							error => console.log(error)
					);
					 this.promotionService.ajouterDetailsPersonneReduction(this.personneReduction,data.obj._id).subscribe(
							data => console.log(data),
							error => console.log(error)
					);
					this.router.navigate(['/promo']);
					},
					error => console.log(error) );
			}
			else{
				
				this.promotionService.modifierPersonneReduction(promo).subscribe(
					data => {
								console.log(data);
								localStorage.removeItem("idPromo");
								this.router.navigate(['/promo']);
								//navigation vers la partie accueil},
					error => console.log(error) );
			}
		}


	}


 //Code pour upload les images de promotions
 upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    this.imagePromo = "/images/promo/"+ files[0].name;
    console.log(this.imagePromo);
   	this.ext = files[0].name.split(".")[1].toLowerCase();
    console.log(this.ext);
    if(this.ext == "png" || this.ext == "gif" || this.ext == "jpg" || this.ext == "jpeg"){
        formData.append("uploads[]", files[0], files[0]['name']);
   		console.log(formData.toString());
    	console.log('form data variable :   '+ formData.toString());
        this.http.post('http://localhost:3000/upload_imgPromo', formData)
        .map(files => files.json())
        .subscribe(files => 
        					console.log('files', files); 
        					this.isUpload= true;
        					console.log(this.nomLogo);
        					
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



//Code qui concerne la partie de Argent et reduction

	ajouterReduction(){
		if(this.prix2 !== "illimité"){
			this.prix2 = document.getElementById("prix2").value;
		}

		const argentPour = new ArgentPourcentage(
			parseFloat(document.getElementById("prix1").value),
			this.prix2,
			parseFloat(document.getElementById("reduction").value)
		);

		if(this.updatePromo === true){
				this.promotionService.ajouterUnDetailArgentReduction(argentPour).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);

		}
		const i = this.argentPourcentage.length;
		this.argentPourcentage[i] = argentPour;
	}


	isIllimite(){	
		if(document.getElementById("illimite").checked === true){
			this.prix2 = "illimité";
			this.inputPrix2 = false;  // pour ne peut pas mettre une valeur à prix2
		}else{
			this.prix2 = "";
			this.inputPrix2 = true; 
		}
	}

	

	modifierReduction(i){
	    const prix2Mod = "";
		if(this.argentPourcentage[i].prix2 === "illimité"){
			prix2Mod = "illimité";
		}else{
			prix2Mod = document.getElementById("prix2Mod"+i).value;
		}
		const argentPour = new ArgentPourcentage(
			parseFloat(document.getElementById("prix1Mod"+i).value),
			prix2Mod,
			parseFloat(document.getElementById("reductionMod"+i).value)
		);
		if(this.updatePromo === true){
			this.promotionService.modifierDetailsArgentReduction(argentPour,this.id_argentPourcentage[i])
			.subscribe(	data => {console.log(data);},
						error => console.log(error) );
		this.argentPourcentage[i] = argentPour;
		console.log(this.argentPourcentage[i]);
	   }
	}

	SupprimerReduction(i){
		if(this.updatePromo === true){
			this.promotionService.supprimerDetailsArgentReduction(this.id_argentPourcentage[i]).subscribe(
										data => {console.log(data);},
										error => console.log(error));
			}
			 const el = this.argentPourcentage.splice(i, 1);
			 console.log(el);
	}


	//Ce code concerne la partie de détails de chaque promotion
	ajouterDetail(){
		const i = this.detailsPromo.length;
		this.detailsPromo[i] = document.getElementById("detailPromo").value;
		console.log(this.detailsPromo);
		if(this.updatePromo === true){
		this.promotionService.ajouterUnDetailPromo(this.detailsPromo[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}
	}

	modifierDetail(i){
		console.log(document.getElementById("detailPromoMod"+i).value);
		this.detailsPromo[i] = document.getElementById("detailPromoMod"+i).value;
		console.log(this.detailsPromo);
		if(this.updatePromo === true){
		this.promotionService.modifierDetailPromo(this.detailsPromo[i],this.id_detailPromo[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}
	}

	SupprimerDetail(i){

			if(this.updatePromo === true){
		this.promotionService.supprimerDetailPromo(this.id_detailPromo[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}
		 const el = this.detailsPromo.splice(i, 1);
		 console.log(el);
		 console.log(this.detailsPromo);
	}




//Ce code pour la partie de promotion nombre de personne et reduction

	isIllimitePersonne(){
			
		if(document.getElementById("illimitePersonne").checked === true){
				this.inputPersonne2 = false;
			    this.nbPersonne2 = "illimité";
			
		}else{
			this.nbPersonne2 = "";
			this.inputPersonne2 = true; 
		}
		
	}

	ajouterReductionPersonne(){
		if(this.nbPersonne2 !== "illimité"){
			this.nbPersonne2  = document.getElementById("nbpersonne2").value;
		}
		const personneRedu = new PersonneReduction(
			parseInt(document.getElementById("nbpersonne1").value),
			this.nbPersonne2,
			parseFloat(document.getElementById("reductionPersonne").value)
		);
		console.log(personneRedu);
		const i = this.personneReduction.length;
		this.personneReduction[i] = personneRedu;
		console.log(this.personneReduction); 

	}

	modifierReductionPersonne(i){
		 const personne2Mod = "";
		if(this.personneReduction[i].personne2 === "illimité"){
			personne2Mod= "illimité";
		}else{
			personne2Mod = document.getElementById("nbpersonne2Mod"+i).value;
		}
		const personneRedu = new PersonneReduction(
			parseInt(document.getElementById("nbpersonne1Mod"+i).value),
			personne2Mod,
			parseFloat(document.getElementById("reductionPersonneMod"+i).value)
		);
		this.personneReduction[i] = personneRedu;
		console.log(this.personneReduction);
		if(this.updatePromo === true){
			this.promotionService.modifierDetailsPersonneReduction(personneRedu,this.id_personneReduction[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		

		}
	}

	SupprimerReductionPersonne(i){
	if(this.updatePromo === true){
		this.promotionService.supprimerDetailsPersonneReduction(this.id_personneReduction[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}
		 const el = this.personneReduction.splice(i, 1);
		 console.log(el);
	}


verfierIllimite(objet){
		if(objet === "illimité"){
				return false;
		}else{
				return true;
		}
	}


}