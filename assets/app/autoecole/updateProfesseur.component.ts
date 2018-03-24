import { Component, OnInit } from "@angular/core";
import { AutoEcoleService } from "./autoecole.service";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Professeur } from "./professeur.model";
import { Http, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";


@Component({
	selector: 'app-updateprof'
	templateUrl: './updateProfesseur.component.html'
})

export class UpdateProfesseurComponent implements OnInit{

	myForm: FormGroup;
	conduit: Boolean;
	code: Boolean;
	isUplode: Boolean;
	coursExist: Boolean;
	imgProf: String = "/images/professeur/DSC_0037.jpg";  //il faut mettre une image par défaut
	typeCours: String;
	isUpdate: Boolean = false;
	constructor(private autoEcoleService: AutoEcoleService, private http: Http, private router: Router){}
	ngOnInit(){
		this.isUpload = false;
		this.coursExist = false;
		this.myForm = new FormGroup({
			
			nom: new FormControl(null, Validators.required),
			prenom: new FormControl(null, Validators.required),
			cin: new FormControl(null, Validators.required),
			email: new FormControl(null,[
			Validators.required,
			Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
			adresse: new FormControl(null, Validators.required),
			telephone: new FormControl(null, Validators.required),
			img: new FormControl(null),
			description: new FormControl(null, Validators.required),
			date: new FormControl(null, Validators.required),
			conduit: new FormControl(null),
			code: new FormControl(null)
		});

		if(localStorage.getItem("idProf") !== null){
			this.isUpdate = true;
			this.autoEcoleService.getProfById().subscribe(
				data => {
					console.log(data);
					document.getElementById("nom").value = data.object.nom;
					document.getElementById("prenom").value = data.object.prenom;
					document.getElementById("cin").value = data.object.CIN;
					document.getElementById("email").value = data.object.email;
					document.getElementById("adresse").value = data.object.adresse;
					document.getElementById("telephone").value = data.object.telephone;
					this.imgProf = data.object.img;
					document.getElementById("description").value = data.object.description;
					document.getElementById("date").value = data.object.date_depart.substr(0,10);
					console.log(data.object.date_depart.substr(0,10));
					if(data.object.type_cours === "code"){
						document.getElementById("code").checked = true;
					} else if(data.object.type_cours === "conduit"){
						document.getElementById("conduit").checked = true;
					} else if(data.object.type_cours === "code et conduit"){
						document.getElementById("conduit").checked = true;
						document.getElementById("code").checked = true;
					}
					
				},
				error => console.log(error)
			);

		}

		console.log("update un professeur");
		
		console.log(this.myForm);

	}

	onSubmit(){
		this.code = this.myForm.value.code;
		this.conduit = this.myForm.value.conduit;
		this.coursExist = document.getElementById("code").checked || document.getElementById("conduit").checked;
		
		if(document.getElementById("code").checked === true & document.getElementById("conduit").checked === false){
				this.typeCours = "code";
		}else if(document.getElementById("code").checked === true & document.getElementById("conduit").checked === true){
				this.typeCours = "code et conduit";
		} else if(document.getElementById("code").checked === false &  document.getElementById("conduit").checked=== true){
				this.typeCours = "conduit";
		}

		if(!this.coursExist){
			alert("Il faut sélection le type de cours!!");
		} else {

			console.log(this.typeCours);
			const prof = new Professeur(


					document.getElementById("nom").value,
					document.getElementById("prenom").value,
					document.getElementById("cin").value,
					this.imgProf,
				    this.typeCours,
				    document.getElementById("description").value,
				    document.getElementById("date").value,
				    document.getElementById("adresse").value,
				    document.getElementById("telephone").value,
					document.getElementById("email").value,
			);
			if(this.isUpdate === false){
				this.autoEcoleService.ajouterProf(prof).subscribe(
					data => {
								console.log(data);
								this.router.navigate(['/auto', 'profAuto']);},
					error => console.log(error)
			);
			
			} else {

					this.autoEcoleService.modifierProf(prof).subscribe(
								data => {
								  console.log(data);
								  localStorage.removeItem("idProf");
								},
								error => console.log(error)
					);

			}
			console.log("tous va bien!!");
			
		}
		console.log(this.myForm);
	}

	upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    this.imgProf = "/images/professeur/"+ files[0].name;
    console.log(this.imgProf);
   	this.ext = files[0].name.split(".")[1].toLowerCase();
    console.log(this.ext);
    if(this.ext == "png" || this.ext == "gif" || this.ext == "jpg" || this.ext == "jpeg"){
        formData.append("uploads[]", files[0], files[0]['name']);
   		console.log(formData.toString());
    	console.log('form data variable :   '+ formData.toString());
        this.http.post('http://localhost:3000/upload_prof', formData)
        .map(files => files.json())
        .subscribe(files => 
        					console.log('files', files); 
        					this.isUpload= true;
        					console.log(this.imgProf);
        					
        					);
    } else{
     alert("Attention les images au format '"+this.ext+"' ne sont pas autorisées !\n");
    }
    console.log(this.isUpload);
  //  console.log(document.getElementById("logoImg"));
    
   		
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
}