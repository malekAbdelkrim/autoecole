import { Component , OnInit } from '@angular/core';
import { PackService } from "./pack.service";
import { Pack } from "./pack.model";
import { Router } from "@angular/router";



@Component({
    selector: 'app-pack',
    templateUrl: './pack.component.html'
})
export class PackComponent implements OnInit{

	arrayPackCode = [];
	arrayPackConduit = [];
	arrayPackCodeConduit = [];

	id_arrayPackCode = [];
	id_arrayPackConduit = [];
	id_arrayPackCodeConduit = [];

	detailsPackCode = [];
	detailsPackConduit = [];
	detailsPackCodeConduit = [];

	
	constructor(private packService: PackService, private router: Router){}
	ngOnInit(){


			this.packService.getAllPack().subscribe(
				data => {
				console.log(data);
				const i =0;
				for(i=0; i<data.object.length; i++){
					const p = new Pack();
					p.titre = data.object[i].titre;
					p.description = data.object[i].description;
					p.prix = data.object[i].prix;
					if(data.object[i].type_pack === "Pack code"){
						p.nb_heure_code = data.object[i].nb_heure_code;
						this.arrayPackCode[this.arrayPackCode.length] = p;
						this.id_arrayPackCode[this.id_arrayPackCode.length] = data.object[i]._id;
						this.packService.getDetailsPack(data.object[i]._id).subscribe(
							data => {
								console.log(data);
								const i =0;
								const ensemble = [];
								for(i=0;i<data.object.length;i++){
									ensemble[i] = data.object[i].detail;
								}
								this.detailsPackCode[this.detailsPackCode.length] = ensemble;
								},
							error => console.log(error)
						);

					}

					if(data.object[i].type_pack === "Pack conduit"){
						p.nb_heure_conduit = data.object[i].nb_heure_conduit;
						this.arrayPackConduit[this.arrayPackConduit.length] = p;
						this.id_arrayPackConduit[this.id_arrayPackConduit.length] = data.object[i]._id;
						this.packService.getDetailsPack(data.object[i]._id).subscribe(
							data => {
								console.log(data);
								const i =0;
								const ensemble = [];
								for(i=0;i<data.object.length;i++){
									ensemble[i] = data.object[i].detail;
								}
								this.detailsPackConduit[this.detailsPackConduit.length] = ensemble;
								},
							error => console.log(error)
						);

					}

					if(data.object[i].type_pack === "Pack code et conduit"){
						p.nb_heure_code = data.object[i].nb_heure_code;
						p.nb_heure_conduit = data.object[i].nb_heure_conduit;
						this.arrayPackCodeConduit[this.arrayPackCodeConduit.length] = p;
						this.id_arrayPackCodeConduit[this.id_arrayPackCodeConduit.length] = data.object[i]._id;
						this.packService.getDetailsPack(data.object[i]._id).subscribe(
							data => {
								console.log(data);
								const i =0;
								const ensemble = [];
								for(i=0;i<data.object.length;i++){
									ensemble[i] = data.object[i].detail;
								}
								this.detailsPackCodeConduit[this.detailsPackCodeConduit.length] = ensemble;
								},
							error => console.log(error)
						);

					}
				}
				console.log(this.arrayPackCodeConduit);
				console.log(this.arrayPackCode);
				console.log(this.arrayPackConduit);


				console.log(this.detailsPackCodeConduit);
				console.log(this.detailsPackCode);
				console.log(this.detailsPackConduit);

				},
				error => console.log(error)
			);
	}

	modifierPackCode(i){
			localStorage.setItem("idPack",this.id_arrayPackCode[i]);
			this.router.navigate(['/updatePack']);


	}

	modifierPackConduit(i){
			localStorage.setItem("idPack",this.id_arrayPackConduit[i]);

	}

	modifierPackCodeConduit(i){
			localStorage.setItem("idPack",this.id_arrayPackCodeConduit[i]);

	}

	supprimerPackCode(i){
		 const el = this.arrayPackCode.splice(i, 1);
		 console.log(el);
		 const el = this.detailsPackCode.splice(i, 1);
		 console.log(el);
		 this.packService.supprimerPack(this.id_arrayPackCode[i]).subscribe(
		 		data => console.log(data),
		 		error => console.log(error)
		 );

	}

	supprimerPackConduit(i){
		 const el = this.arrayPackConduit.splice(i, 1);
		 console.log(el);
		 const el = this.detailsPackConduit.splice(i, 1);
		 console.log(el);
		 this.packService.supprimerPack(this.id_arrayPackConduit[i]).subscribe(
		 		data => console.log(data),
		 		error => console.log(error)
		 );

	}

	supprimerPackCodeConduit(i){
		 const el = this.arrayPackCodeConduit.splice(i, 1);
		 console.log(el);
		 const el = this.detailsPackCodeConduit.splice(i, 1);
		 console.log(el);
		 this.packService.supprimerPack(this.id_arrayPackCodeConduit[i]).subscribe(
		 		data => console.log(data),
		 		error => console.log(error)
		 );

	}
	cleanLocalStorage(){
		localStorage.removeItem("idPack");
	}
	
}