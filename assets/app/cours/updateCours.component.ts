import { Component , OnInit } from '@angular/core';
import { CoursService } from "./cours.service";

import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Http, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";
import { Cours } from "./cours.model";
import * as FileSaver from 'file-saver';




@Component({
    selector: 'app-updatecours',
    templateUrl: './updateCours.component.html'
})
export class UpdateCoursComponent implements OnInit{
	myForm: FormGroup;
  isUpload= false;
  updateCours: Boolean = false;
  cours: String;
  nomCours : String;
  constructor(private coursService : CoursService, private http: Http, private router: Router){}
  ngOnInit(){

    if(localStorage.getItem('idCours')!== null){

      console.log(localStorage.getItem('idCours'));
      this.updateCours = true;
      this.coursService.findCoursById().subscribe(
        data => {
                  console.log(data);
                   document.getElementById("titre").value = data.object.titre;
                   document.getElementById("description").value = data.object.description;
                   const pos1= data.object.contenu.lastIndexOf('/'); 
                   this.nomCours = data.object.contenu.substr(pos1+1,data.object.contenu.length),
                   this.cours = data.object.contenu;

                  },
        error => console.log(error)
       );

    }

  	this.myForm = new FormGroup({
  		titre: new FormControl(null, Validators.required),
		description: new FormControl(null, Validators.required),
		contenu: new FormControl(null),
  	});

  }

  onSubmit(){
    var currentTime = new Date();
    var month = ("0" + currentTime.getMonth()).slice(-2);
    var day = ("0" + currentTime.getDate()).slice(-2);
    var year = currentTime.getFullYear();

    var hour = ("0" + currentTime.getHours()).slice(-2);
    var minute = ("0" + currentTime.getMinutes()).slice(-2);



    var dt = (day + "/" + month + "/" + year + " "+ hour + ":"+ minute);

     console.log(this.cours);
    console.log(currentTime);

    const coursAjouter = new Cours(
      document.getElementById("titre").value,
      document.getElementById("description").value,
      this.cours,
      dt

    );
    if(this.updateCours === true){
      this.coursService.updateCours(coursAjouter).subscribe(
        data => {
           console.log(data);
           localStorage.removeItem("idCours");
           this.router.navigate(['/cours'];
         },
        error => console.log(error)
       );
    }else{

       this.coursService.ajouterNvCours(coursAjouter).subscribe(
        data => {
                  console.log(data);
                   this.router.navigate(['/cours'];
                },
        error => console.log(error)
        );

    }
   
    console.log(coursAjouter);
   
    
  }

  downloadFile(){
     this.coursService.getFile(this.cours).subscribe(
          fileData => FileSaver.saveAs(fileData, "file.pdf")
        );
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    this.cours = "/cours/"+ files[0].name;
    console.log(this.cours);
   	this.ext = files[0].name.split(".")[1].toLowerCase();
    console.log(this.ext);
    
        formData.append("uploads[]", files[0], files[0]['name']);
   		console.log(formData.toString());
    	console.log('form data variable :   '+ formData.toString());
     
        this.http.post('http://localhost:3000/cours/upload_cours', formData)
        .map(files => files.json())
        .subscribe(files => 
        					console.log('files', files); 
        					this.isUpload= true;
        					console.log(this.cours);
        					
        					);
   
    console.log(this.isUpload);.
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
    
}
