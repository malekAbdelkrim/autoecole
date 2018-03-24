import { Component , OnInit , ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Pack } from "./pack.model";
import { PackService } from "./pack.service";
import { Router } from "@angular/router";
 

@Component({
    selector: 'app-updatepack',
    templateUrl: './updatepack.component.html'
})
export class UpdatePackComponent implements OnInit{
	myForm: FormGroup;
	choix: String;
	nbHeureCode: String;
	inputnbHeureCode = true;
	detailsPack = [];
	updatePack = false;
	arrayIdDetail = [];
	typePack = "";
	constructor(private packService: PackService, private cd: ChangeDetectorRef, private router: Router){}

	ngOnInit(){

		console.log(localStorage.getItem("idPack"));
		if(localStorage.getItem("idPack")!== null){
			this.updatePack = true;
			this.packService.getUnPack(localStorage.getItem("idPack")).subscribe(
									data => {
									console.log(data);
									if(data.object.type_pack ==="Pack code"){
										this.choix ='1';
										document.getElementById("titre").value = data.object.titre ;
										document.getElementById("description").value = data.object.description ;
										this.typePack = data.object.type_pack;
										this.cd.detectChanges();
										document.getElementById("prix").value = data.object.prix;

										if(data.object.nb_heure_code === "illimité"){
											document.getElementById("illimite").checked = true;
											this.nbHeureCode = "illimité";
											this.inputnbHeureCode = false; 	
										}else{
												this.inputnbHeureCode = true; 	
												document.getElementById("nb_heure_code").value = data.object.nb_heure_code ;
												this.nbHeureCode = document.getElementById("nb_heure_code").value;
										}
										this.packService.getDetailsPack(localStorage.getItem("idPack")).subscribe(
												data => {
												console.log(data);
												const i=0;
												for(i=0;i<data.object.length;i++){
													this.detailsPack[i] = data.object[i].detail;
													this.arrayIdDetail[i] = data.object[i]._id;
												}
												console.log(this.detailsPack);
												},
												error => console.log(error)
										);

									}

									if(data.object.type_pack ==="Pack conduit"){
										this.choix ='2';
										document.getElementById("titre").value = data.object.titre ;
										document.getElementById("description").value = data.object.description ;
										this.cd.detectChanges();
										document.getElementById("prix").value = data.object.prix;
										document.getElementById("nb_heure_conduit").value = data.object.nb_heure_conduit;
										this.typePack = data.object.type_pack;
										
										this.packService.getDetailsPack(localStorage.getItem("idPack")).subscribe(
												data => {
												console.log(data);
												const i=0;
												for(i=0;i<data.object.length;i++){
													this.detailsPack[i] = data.object[i].detail;
													this.arrayIdDetail[i] = data.object[i]._id;
												}
												console.log(this.detailsPack);
												},
												error => console.log(error)
										);

									}

									if(data.object.type_pack ==="Pack code et conduit"){
										this.choix ='3';
										document.getElementById("titre").value = data.object.titre ;
										document.getElementById("description").value = data.object.description ;
										this.cd.detectChanges();
										document.getElementById("prix").value = data.object.prix;
										document.getElementById("nb_heure_conduit").value = data.object.nb_heure_conduit;
										this.typePack = data.object.type_pack;
										if(data.object.nb_heure_code === "illimité"){
											document.getElementById("illimite").checked = true;
											this.nbHeureCode = "illimité";
											this.inputnbHeureCode = false; 	
										}else{
												this.inputnbHeureCode = true; 	
												document.getElementById("nb_heure_code").value = data.object.nb_heure_code ;
												this.nbHeureCode = document.getElementById("nb_heure_code").value;
										}
										
										this.packService.getDetailsPack(localStorage.getItem("idPack")).subscribe(
												data => {
												console.log(data);
												const i=0;
												for(i=0;i<data.object.length;i++){
													this.detailsPack[i] = data.object[i].detail;
													this.arrayIdDetail[i] = data.object[i]._id;
												}
												console.log(this.detailsPack);
												},
												error => console.log(error)
										);

									}


									},
									error => console.log(error)
									);
		}

		this.myForm = new FormGroup({
			titre: new FormControl(null, Validators.required),
			description: new FormControl(null, Validators.required),
			nb_heure_code: new FormControl(null),
			nb_heure_conduit: new FormControl(null),
			prix: new FormControl(null),
			detailPack: new FormControl(null)
		});

	}

	getChoix(){
		  var sel2 = document.getElementById("choixPromo");
		  console.log(sel2.options[sel2.selectedIndex]);
		  this.choix = sel2.options[sel2.selectedIndex].value;
		  console.log(this.choix);
		  console.log(sel2.options[sel2.selectedIndex].text);
		  this.typePack = sel2.options[sel2.selectedIndex].text;

	}

	onSubmit(){

		const p = new Pack();
		p.titre = document.getElementById("titre").value;
		p.description = document.getElementById("description").value;
		p.type_pack = this.typePack;
		console.log(parseFloat(document.getElementById("prix").value));
		p.prix = parseFloat(document.getElementById("prix").value);
		p.remise = 0;

		if(this.choix === '1'){
			if(this.nbHeureCode !== "illimité"){
				this.nbHeureCode = document.getElementById("nb_heure_code").value;
			 }
			p.nb_heure_code = this.nbHeureCode;
		}

		if(this.choix === '2'){
			p.nb_heure_conduit = parseInt(document.getElementById("nb_heure_conduit").value);
		}

		if(this.choix === '3'){
			if(this.nbHeureCode !== "illimité"){
				this.nbHeureCode = document.getElementById("nb_heure_code").value;
			 }
			p.nb_heure_code = this.nbHeureCode;
			p.nb_heure_conduit = parseInt(document.getElementById("nb_heure_conduit").value);

		}
		console.log(p);
		if(this.updatePack === true){
				this.packService.modifierPack(p).subscribe(
					data => {
								console.log(data);
								localStorage.removeItem("idPack");
								this.router.navigate(['/pack']);

							},
					error => console.log(error)
				);
		}else{
			this.packService.ajouterPack(p).subscribe(
			data => {
						console.log(data);
						this.packService.ajouterDetailsPack(this.detailsPack,data.obj._id).subscribe(
									data => {
									console.log(data);
									this.router.navigate(['/pack']);
									},
									error => console.log(error));
					},
			error => console.log(error)
		);
		}
		
		
	}


	isIllimite(){
			if(document.getElementById("illimite").checked === true){
			this.nbHeureCode = "illimité";
			this.inputnbHeureCode = false; 
		}else{
			this.nbHeureCode = "";
			this.inputnbHeureCode = true;  // pour ne peut pas mettre une valeur à prix2
		}

	}

	ajouterDetail(){
		const i = this.detailsPack.length;
		this.detailsPack[i] = document.getElementById("detailPack").value;
		console.log(this.detailsPack);
		if(this.updatePack === true){
				this.packService.ajouterUnDetailPack(this.detailsPack[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}

	}

	modifierDetail(i){

		console.log(document.getElementById("detailPackMod"+i).value);
		this.detailsPack[i] = document.getElementById("detailPackMod"+i).value;
		console.log(this.detailsPack);
		if(this.updatePack === true){
		this.packService.modifierDetailPack(this.detailsPack[i],this.arrayIdDetail[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}

	}
	supprimerDetail(i){
	if(this.updatePack === true){
		this.packService.supprimerDetailPack(this.arrayIdDetail[i]).subscribe(
									data => {console.log(data);},
									error => console.log(error)
									);
		}
	const el = this.detailsPack.splice(i, 1);
		 console.log(el);
		 console.log(this.detailsPack);

	}
	
}