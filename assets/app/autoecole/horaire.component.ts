import { Component, OnInit } from "@angular/core";
import { AutoEcoleService } from "./autoecole.service";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Horaire } from "./horaire.model";

@Component({
	selector: 'app-horaire'
	templateUrl: './horaire.component.html'
})
export class HoraireComponent implements OnInit{
	myForm: FormGroup;
	jour: String;
	heure_ouv_matin: String;
	heure_ferm_matin: String;
	heure_ouv_soir: String;
	heure_ferm_soir: String;
	existHoraire: Boolean;
				

	constructor(private autoEcoleService: AutoEcoleService){}

	ngOnInit(){
		this.autoEcoleService.infoHoraire().subscribe(
				data => {

						console.log(data);
						if(data.object.length == 0){
							this.existHoraire = false;
						}else{
						  this.existHoraire = true;
						  document.getElementById("matinOuv1").value =  data.object[0].heure_ouv_matin;
						  document.getElementById("matinFerm1").value =  data.object[0].heure_ferm_matin;
						  document.getElementById("soirOuv1").value =  data.object[0].heure_ouv_soir;
						  document.getElementById("soirFerm1").value =  data.object[0].heure_ferm_soir;

						  document.getElementById("matinOuv2").value =  data.object[1].heure_ouv_matin;
						  document.getElementById("matinFerm2").value =  data.object[1].heure_ferm_matin;
						  document.getElementById("soirOuv2").value =  data.object[1].heure_ouv_soir;
						  document.getElementById("soirFerm2").value =  data.object[1].heure_ferm_soir;

						  document.getElementById("matinOuv3").value =  data.object[2].heure_ouv_matin;
						  document.getElementById("matinFerm3").value =  data.object[2].heure_ferm_matin;
						  document.getElementById("soirOuv3").value =  data.object[2].heure_ouv_soir;
						  document.getElementById("soirFerm3").value =  data.object[2].heure_ferm_soir;

						  document.getElementById("matinOuv4").value =  data.object[3].heure_ouv_matin;
						  document.getElementById("matinFerm4").value =  data.object[3].heure_ferm_matin;
						  document.getElementById("soirOuv4").value =  data.object[3].heure_ouv_soir;
						  document.getElementById("soirFerm4").value =  data.object[3].heure_ferm_soir;

						  document.getElementById("matinOuv5").value =  data.object[4].heure_ouv_matin;
						  document.getElementById("matinFerm5").value =  data.object[4].heure_ferm_matin;
						  document.getElementById("soirOuv5").value =  data.object[4].heure_ouv_soir;
						  document.getElementById("soirFerm5").value =  data.object[4].heure_ferm_soir;

						  document.getElementById("matinOuv6").value =  data.object[5].heure_ouv_matin;
						  document.getElementById("matinFerm6").value =  data.object[5].heure_ferm_matin;
						  document.getElementById("soirOuv6").value =  data.object[5].heure_ouv_soir;
						  document.getElementById("soirFerm6").value =  data.object[5].heure_ferm_soir;

						  document.getElementById("matinOuv0").value =  data.object[6].heure_ouv_matin;
						  document.getElementById("matinFerm0").value =  data.object[6].heure_ferm_matin;
						  document.getElementById("soirOuv0").value =  data.object[6].heure_ouv_soir;
						  document.getElementById("soirFerm0").value =  data.object[6].heure_ferm_soir;
						}


						},
				error => console.log(error)
		);

		
			
		
		
	}

	modifier(num){
		if(num == 1){
			const horaire1 = new Horaire(
			 "Lundi",
			  document.getElementById("matinOuv1").value,
			  document.getElementById("matinFerm1").value,
			  document.getElementById("soirOuv1").value,
			  document.getElementById("soirFerm1").value
		);
		this.autoEcoleService.modifierHoraire(horaire1).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}

		if(num == 2){
			const horaire2 = new Horaire(
			 "Mardi",
			  document.getElementById("matinOuv2").value,
			  document.getElementById("matinFerm2").value,
			  document.getElementById("soirOuv2").value,
			  document.getElementById("soirFerm2").value
		);
		this.autoEcoleService.modifierHoraire(horaire2).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}

		if(num == 3){
			const horaire3 = new Horaire(
			 "Mercredi",
			  document.getElementById("matinOuv3").value,
			  document.getElementById("matinFerm3").value,
			  document.getElementById("soirOuv3").value,
			  document.getElementById("soirFerm3").value
		);
		this.autoEcoleService.modifierHoraire(horaire3).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}

		if(num == 4){
			const horaire4 = new Horaire(
			 "Jeudi",
			  document.getElementById("matinOuv4").value,
			  document.getElementById("matinFerm4").value,
			  document.getElementById("soirOuv4").value,
			  document.getElementById("soirFerm4").value
		);
		this.autoEcoleService.modifierHoraire(horaire4).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}

		if(num == 5){
			const horaire5 = new Horaire(
			 "Vendredi",
			  document.getElementById("matinOuv5").value,
			  document.getElementById("matinFerm5").value,
			  document.getElementById("soirOuv5").value,
			  document.getElementById("soirFerm5").value
		);
		this.autoEcoleService.modifierHoraire(horaire5).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}

		if(num == 6){
			const horaire6 = new Horaire(
			 "Samedi",
			  document.getElementById("matinOuv6").value,
			  document.getElementById("matinFerm6").value,
			  document.getElementById("soirOuv6").value,
			  document.getElementById("soirFerm6").value
		);
		this.autoEcoleService.modifierHoraire(horaire6).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}

		if(num == 0){
			const horaire0 = new Horaire(
			 "Dimanche",
			  document.getElementById("matinOuv0").value,
			  document.getElementById("matinFerm0").value,
			  document.getElementById("soirOuv0").value,
			  document.getElementById("soirFerm0").value
		);
		this.autoEcoleService.modifierHoraire(horaire0).subscribe(
				data => {
						console.log(data);
				},
				error => console.log(error)
		);
		}
	}
	 
	onSubmit(){
		const horaire1 = new Horaire(
			 "Lundi",
			  document.getElementById("matinOuv1").value,
			  document.getElementById("matinFerm1").value,
			  document.getElementById("soirOuv1").value,
			  document.getElementById("soirFerm1").value
		);
		const horaire2 = new Horaire(
			 "Mardi",
			  document.getElementById("matinOuv2").value,
			  document.getElementById("matinFerm2").value,
			  document.getElementById("soirOuv2").value,
			  document.getElementById("soirFerm2").value
		);
		const horaire3 = new Horaire(
			 "Mercredi",
			  document.getElementById("matinOuv3").value,
			  document.getElementById("matinFerm3").value,
			  document.getElementById("soirOuv3").value,
			  document.getElementById("soirFerm3").value
		);
		const horaire4 = new Horaire(
			 "Jeudi",
			  document.getElementById("matinOuv4").value,
			  document.getElementById("matinFerm4").value,
			  document.getElementById("soirOuv4").value,
			  document.getElementById("soirFerm4").value
		);
		const horaire5 = new Horaire(
			 "Vendredi",
			  document.getElementById("matinOuv5").value,
			  document.getElementById("matinFerm5").value,
			  document.getElementById("soirOuv5").value,
			  document.getElementById("soirFerm5").value
		);
		const horaire6 = new Horaire(
			 "Samedi",
			  document.getElementById("matinOuv6").value,
			  document.getElementById("matinFerm6").value,
			  document.getElementById("soirOuv6").value,
			  document.getElementById("soirFerm6").value
		);
		const horaire0 = new Horaire(
			 "Dimanche",
			  document.getElementById("matinOuv0").value,
			  document.getElementById("matinFerm0").value,
			  document.getElementById("soirOuv0").value,
			  document.getElementById("soirFerm0").value
		);

		this.autoEcoleService.ajouterHoraire(horaire1).subscribe(
				data => console.log(data),
				error => console.log(error)
		);

		this.autoEcoleService.ajouterHoraire(horaire2).subscribe(
				data => console.log(data),
				error => console.log(error)
		);

		this.autoEcoleService.ajouterHoraire(horaire3).subscribe(
				data => console.log(data),
				error => console.log(error)
		);

		this.autoEcoleService.ajouterHoraire(horaire4).subscribe(
				data => console.log(data),
				error => console.log(error)
		);

		this.autoEcoleService.ajouterHoraire(horaire5).subscribe(
				data => console.log(data),
				error => console.log(error)
		);

		this.autoEcoleService.ajouterHoraire(horaire6).subscribe(
				data => console.log(data),
				error => console.log(error)
		);

		this.autoEcoleService.ajouterHoraire(horaire0).subscribe(
				data => console.log(data),
				error => console.log(error)
		);
	}

}