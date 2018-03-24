import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { PromotionService } from "./promotion.service";
import { NouveauPack } from "./nvPack.model";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Promo } from "./promo.model";
import { detailPromo } from "./detailPromo.model"



@Component({
	selector: 'app-accueilpromo',
	templateUrl: './accueilPromo.component.html'
})

export class AccueilPromoComponent implements OnInit{
	myForm: FormGroup;
	existPromo = false; //Pour avoir à ce moment on a une promotion
	auraPromo = false;  //Pour avour si on aura aprés une promotion
	historiquePromo = false; // Pour avoir si notre promotion est dans l'historique
	valablePromo = false;
	image: any;
	idPromo: String;
	promo : Promo;
	updatePromo: boolean;
	typePack: String;
	detailsPromo = [];
	constructor(private promotionService: PromotionService, private sanitizer:DomSanitizer, private router: Router){}

	ngOnInit(){
		var currentTime = new Date();
		var month = currentTime.getMonth();
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		var dt = (day + "/" + month + "/" + year);
		console.log(dt);

		this.promotionService.getPromotion().subscribe(
			data => {
				console.log(data);
				if(data.object.length===0){
					this.existPromo = false;
				} else{
					const i = data.object.length-1;
					
					console.log(data);
					this.idPromo = data.object[i]._id;
					console.log(this.idPromo);
					if(data.object[i].nouveau_pack !== undefined){
						this.typePack = "nouveau_pack";
						this.valablePromo = data.object[i].nouveau_pack.valable;
						this.historiquePromo = data.object[i].nouveau_pack.historique;
						this.promo = new Promo(
						data.object[i].nouveau_pack.titre,
						data.object[i].nouveau_pack.description,
						data.object[i].nouveau_pack.image,
						data.object[i].nouveau_pack.date_depart.substr(0,10),
						data.object[i].nouveau_pack.date_expiration.substr(0,10)
					);
					}

					if(data.object[i].pack !== undefined){
						this.valablePromo = data.object[i].pack.valable;
						this.historiquePromo = data.object[i].pack.historique;
						this.typePack = "pack";
						this.promo = new Promo(
						data.object[i].pack.titre,
						data.object[i].pack.description,
						data.object[i].pack.image,
						data.object[i].pack.date_depart.substr(0,10),
						data.object[i].pack.date_expiration.substr(0,10)
					);
					}

					if(data.object[i].prix_code_conduit !== undefined){
					    this.valablePromo = data.object[i].prix_code_conduit.valable;
						this.historiquePromo = data.object[i].prix_code_conduit.historique;
						this.typePack = "prix_code_conduit";
						this.promo = new Promo(
						data.object[i].prix_code_conduit.titre,
						data.object[i].prix_code_conduit.description,
						data.object[i].prix_code_conduit.image,
						data.object[i].prix_code_conduit.date_depart.substr(0,10),
						data.object[i].prix_code_conduit.date_expiration.substr(0,10)
					);
					}

					if(data.object[i].totaliteArgent !== undefined){
					    this.valablePromo = data.object[i].totaliteArgent.valable;
						this.historiquePromo = data.object[i].totaliteArgent.historique;
						this.typePack = "totaliteArgent";
						this.promo = new Promo(
						data.object[i].totaliteArgent.titre,
						data.object[i].totaliteArgent.description,
						data.object[i].totaliteArgent.image,
						data.object[i].totaliteArgent.date_depart.substr(0,10),
						data.object[i].totaliteArgent.date_expiration.substr(0,10)
					);
					}

					if(data.object[i].nombrePersonne !== undefined){
						this.valablePromo = data.object[i].nombrePersonne.valable;
						this.historiquePromo = data.object[i].nombrePersonne.historique;
						this.typePack = "nombrePersonne";
						this.promo = new Promo(
						data.object[i].nombrePersonne.titre,
						data.object[i].nombrePersonne.description,
						data.object[i].nombrePersonne.image,
						data.object[i].nombrePersonne.date_depart.substr(0,10),
						data.object[i].nombrePersonne.date_expiration.substr(0,10)
					);
					}

					const anDateDepart = parseInt(this.promo.date_depart.substr(0,4));
					const moisDateDepart = parseInt(this.promo.date_depart.substr(5,2));
					const jourDateDepart = parseInt(this.promo.date_depart.substr(8,2));

					const anDateExpiration = parseInt(this.promo.date_expiration.substr(0,4));
					const moisDateExpiration = parseInt(this.promo.date_expiration.substr(5,2));
					const jourDateExpiration = parseInt(this.promo.date_expiration.substr(8,2));

					const anDateSys = parseInt(dt.slice(-4));
					const moisDateSys = parseInt(("0" + month).slice(-2))+1;
					const jourDateSys = parseInt(dt.substr(0,2));


					//Pour avoir si on aura une promotion aprés
					if(this.historiquePromo === false){
						if(anDateDepart > anDateSys){
						this.auraPromo = true;
						}
						if(anDateDepart < anDateSys){
							this.auraPromo = false;
						}
						if(anDateDepart === anDateSys){
							if(moisDateDepart > moisDateSys){
								this.auraPromo = true;
							}

							if(moisDateDepart < moisDateSys){
								this.auraPromo = false;
							}

							if(moisDateDepart === moisDateSys){
								if(jourDateDepart > jourDateSys){
									console.log(jourDateDepart+"---"+jourDateSys);
									console.log("jourDateDepart > jourDateSys");
									this.auraPromo = true;
								}else{
									console.log(jourDateDepart+"---"+jourDateSys);
									console.log("jourDateDepart < jourDateSys");
									this.auraPromo = false;
								}
							}
						}

					}
					
					 

					//Pour avoir si la promotion est au cours & update notre base de donnée coté validité 
					if(this.historiquePromo === false){

					if(anDateDepart < anDateSys){

						if(anDateExpiration < anDateSys){
							this.existPromo = false;
						}

						if(anDateExpiration === anDateSys){
							if(moisDateExpiration < moisDateSys){
								this.existPromo = false;
							}

							if(moisDateExpiration > moisDateSys){
								this.existPromo = true;
							}

							if(moisDateExpiration === moisDateSys){
								if(jourDateExpiration >= jourDateSys){
									this.existPromo = true;
								}else{
									this.existPromo = false;
								}
							}

						}

						if(anDateExpiration > anDateSys){
							this.existPromo = true;
						}

					}

					if(anDateDepart === anDateSys){
						if(moisDateDepart > moisDateSys){
							console.log("anDateDepart === anDateSys && moisDateDepart > moisDateSys");
							this.existPromo = false;
						}

						if(moisDateDepart === moisDateSys){
							if(jourDateDepart >= jourDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart === moisDateSys && jourDateDepart >= jourDateSys");
								this.existPromo = false;
							}else{
								if(anDateExpiration === anDateSys){
								if(moisDateExpiration > moisDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart == moisDateSys && anDateExpiration < anDateSys && moisDateExpiration > moisDateSys");
									this.existPromo = true;
								}
								if(moisDateExpiration < moisDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart == moisDateSys && anDateExpiration < anDateSys && moisDateExpiration < moisDateSys");
									this.existPromo = false;
								}

								if(moisDateExpiration === moisDateSys){
									if(jourDateExpiration >= jourDateSys){
										console.log("anDateDepart === anDateSys && moisDateDepart == moisDateSys && anDateExpiration < anDateSys && moisDateExpiration == moisDateSys && jourDateExpiration >= jourDateSys");
										this.existPromo = true;
									}else{
									console.log("anDateDepart === anDateSys && moisDateDepart == moisDateSys && anDateExpiration < anDateSys && moisDateExpiration == moisDateSys && jourDateExpiration < jourDateSys");
										this.existPromo = false;
									}
								}

							}
								/*console.log("anDateDepart === anDateSys && moisDateDepart === moisDateSys && jourDateDepart < jourDateSys");
								this.existPromo = true;*/
							}
						}

						if(moisDateDepart < moisDateSys){
							if(anDateExpiration > anDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart < moisDateSys && anDateExpiration > anDateSys");
								this.existPromo = true;
							}

							if(anDateExpiration < anDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart < moisDateSys && anDateExpiration < anDateSys");
								this.existPromo = false;
							}
							if(anDateExpiration === anDateSys){
								if(moisDateExpiration > moisDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart < moisDateSys && anDateExpiration < anDateSys && moisDateExpiration > moisDateSys");
									this.existPromo = true;
								}
								if(moisDateExpiration < moisDateSys){
								console.log("anDateDepart === anDateSys && moisDateDepart < moisDateSys && anDateExpiration < anDateSys && moisDateExpiration < moisDateSys");
									this.existPromo = false;
								}

								if(moisDateExpiration === moisDateSys){
									if(jourDateExpiration >= jourDateSys){
										console.log("anDateDepart === anDateSys && moisDateDepart < moisDateSys && anDateExpiration < anDateSys && moisDateExpiration == moisDateSys && jourDateExpiration >= jourDateSys");
										this.existPromo = true;
									}else{
									console.log("anDateDepart === anDateSys && moisDateDepart < moisDateSys && anDateExpiration < anDateSys && moisDateExpiration == moisDateSys && jourDateExpiration < jourDateSys");
										this.existPromo = false;
									}
								}

							}

						}

					}

					}
					console.log("historique: "+this.historiquePromo);
					console.log("valable: "+this.valablePromo);
					console.log("exist: "+this.existPromo);

					if(this.valablePromo === false && this.existPromo === true){
						this.promotionService.modifierValablePromo(this.idPromo,this.typePack,this.existPromo).subscribe(
								data => console.log(data),
								error => console.log(error)
						);
					}
					if(this.valablePromo === true && this.existPromo === false){
						this.promotionService.modifierValablePromo(this.idPromo,this.typePack,this.existPromo).subscribe(
								data => console.log(data),
								error => console.log(error)
						);
					}

					if(this.auraPromo === false && this.existPromo === false && this.historiquePromo=== false){
						this.promotionService.modifierHistoriquePromo(this.idPromo,this.typePack).subscribe(
								data => console.log(data),
								error => console.log(error)
						);
					}

					if(this.auraPromo === true || this.existPromo === true){
						this.promotionService.getDetailsPromo(this.idPromo).subscribe(
								data => {
								console.log(data);
								for(i=0;i<data.object.length;i++){
									this.detailsPromo[i] = data.object[i].detail;

								}
								console.log(this.detailsPromo);
								},
								error => console.log(error)
						);
					}




					console.log("Dans la période: "+this.existPromo);
					console.log("On aura une promotion: "+this.auraPromo);
					this.updatePromo = this.existPromo || this.auraPromo;



					

				
				}
				},
			error => console.log(error)

		);
	}

	ajouterPromo(){
			localStorage.removeItem('idPromo');
			this.router.navigate(['/updatePromo']);
	}

	removePromo(){
		this.promotionService.supprimerNvPack(this.idPromo).subscribe(
						data => {
						console.log(data);
						//this.router.navigate(['/promo']);
						window.location.reload();
						},
						error => console.log(error)
		);

	}

	updatePromoFn(){
			localStorage.setItem('idPromo', this.idPromo);
			this.router.navigate(['/updatePromo']);
	}



		
	

}