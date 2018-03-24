import { Component, OnInit } from "@angular/core";
import { AutoEcoleService } from "./autoecole.service";
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { AutoEcole } from "./autoecole.model";
import { Http, Headers, Response } from "@angular/http";


@Component({
	selector: 'app-autoecole'
	templateUrl: './autoecole.component.html'
})

export class AutoEcoleComponent implements OnInit{

	existAuto: boolean;
	myForm: FormGroup;
	email: string;
	nom: string;
	code: string;
	description: string;
	facebook: string;
	twitter: string;
	instagram: string;
	map: string;
	adresse: string;
	proprietaire: string;
	telephone: string;
	logo: string;
	prixCode: number;
	prixConduit: number;
	filesToUpload: Array<File> = [];
	ext: String = "";
	isUpload: boolean = false;
	nomLogo: string = "";

	constructor(private autoEcoleService: AutoEcoleService, private http: Http){}
	ngOnInit(){
		//this.existAuto = false;

		
		this.autoEcoleService.infoAutoEcole().subscribe(

					data => {
					console.log(data);
					console.log(data.object.length);
					if(data.object.length == 0){
						this.existAuto = false;
						this.email =null;
						this.nom =null;
						this.code =null;
						this.description =null;
						this.facebook =null;
						this.twitter =null;
						this.instagram =null;
						this.map =null;
						this.adresse =null;
						this.proprietaire =null;
						this.telephone =null;
						this.logo =null;
						this.prixCode =null;
						this.prixConduit =null;
					} else {
						this.existAuto = true;
						localStorage.setItem("id_auto", data.object[0]._id);

						this.email = data.object[0].email;
						document.getElementById("email").value = this.email;

						this.nom = data.object[0].nom;
						document.getElementById("nom").value = this.nom;
						

						this.code = data.object[0].code;
						document.getElementById("code").value = this.code;
						
						this.description =data.object[0].description;
						document.getElementById("description").value = this.description;
						

						this.facebook =data.object[0].facebook;
						document.getElementById("facebook").value = this.facebook;
						

						this.twitter =data.object[0].twitter;
						document.getElementById("twitter").value = this.twitter;
						

						this.instagram = data.object[0].instagram;
						document.getElementById("instagram").value = this.instagram;
						
						this.map = data.object[0].map;
						document.getElementById("map").value = this.map;
						

						this.adresse =data.object[0].adresse;
						document.getElementById("adresse").value = this.adresse;
						

						this.proprietaire = data.object[0].nomProprietaire;
						document.getElementById("proprietaire").value = this.proprietaire;
						
						this.telephone = data.object[0].telephone;
						document.getElementById("telephone").value = this.telephone;
						

						this.logo = data.object[0].logo;
						document.getElementById("logo").placeholder = "Changer votre logo...";

						this.prixCode =data.object[0].prix_heure_code+"";
						document.getElementById("prc").value = this.prixCode;
						

						this.prixConduit =data.object[0].prix_heure_conduit+"";
						document.getElementById("prcd").value = this.prixConduit;

						

					}
					
					
					},
					error => console.error(error)
					);
			this.myForm = new FormGroup({
			email: new FormControl(this.email,[
			Validators.required,
			Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),

			nom: new FormControl(this.nom, Validators.required),
			code: new FormControl(this.code, Validators.required),
			description: new FormControl(this.description, Validators.required),
			facebook: new FormControl(this.facebook, Validators.required),
			twitter: new FormControl(this.twitter, Validators.required),
			instagram: new FormControl(this.instagram, Validators.required),
			map: new FormControl(this.map, Validators.required),
			adresse: new FormControl(this.adresse, Validators.required),
			proprietaire: new FormControl(this.proprietaire, Validators.required),
			telephone: new FormControl(this.telephone, Validators.required),
			logo: new FormControl(this.logo),
			prc: new FormControl(this.prc, Validators.required),
			prcd: new FormControl(this.prcd, Validators.required)

		});

		console.log(this.myForm);

	}

	onSubmit(){
		console.log("notre autoEcole");
		const auto = new AutoEcole(
		 	 document.getElementById("email").value,
		 	 document.getElementById("code").value,
		 	 document.getElementById("nom").value,
		 	 document.getElementById("description").value,
		 	 document.getElementById("facebook").value,
		 	 document.getElementById("twitter").value,
		 	 document.getElementById("instagram").value,
		 	 document.getElementById("adresse").value,
		 	 document.getElementById("map").value,
		 	 this.nomLogo,
		 	 document.getElementById("telephone").value,
		 	 document.getElementById("proprietaire").value,
		 	 parseInt(document.getElementById("prc").value),
			 parseInt(document.getElementById("prcd").value)
		);
		console.log(auto);
		console.log(this.isUpload);

		if(!this.existAuto){
			this.autoEcoleService.ajouterAutoEcole(auto).subscribe(
			data => console.log(data),
			error => console.log(error)
		);
		}else{
			this.autoEcoleService.modifierAutoEcole(auto).subscribe(
					data => console.log(data),
					error => console.log(error)
			);

			console.log("------------------------");
			this.autoEcoleService.infoAutoEcole().subscribe(
				   data => console.log(data),
				   error => console.log(error)
			);

		}

		
	}
	

 upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    this.nomLogo = "/images/logo/"+ files[0].name;
    console.log(this.nomLogo);
   	this.ext = files[0].name.split(".")[1].toLowerCase();
    console.log(this.ext);
    if(this.ext == "png" || this.ext == "gif" || this.ext == "jpg" || this.ext == "jpeg"){
        formData.append("uploads[]", files[0], files[0]['name']);
   		console.log(formData.toString());
    	console.log('form data variable :   '+ formData.toString());
        this.http.post('http://localhost:3000/upload_logo', formData)
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
  //  console.log(document.getElementById("logoImg"));
    
   		
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}

}