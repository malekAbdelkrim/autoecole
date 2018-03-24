import { Component , OnInit } from '@angular/core';
import { Cours } from "./cours.model";
import { CoursService } from "./cours.service";
import { Router } from "@angular/router";
import * as FileSaver from 'file-saver';



@Component({
    selector: 'app-cours',
    templateUrl: './cours.component.html'
})
export class CoursComponent implements OnInit{
	listCours = [];
	id_cours =[];
  path: String;
	
  constructor(private coursService : CoursService, private router: Router){}
  ngOnInit(){
  	this.coursService.findAllCours().subscribe(
  			data => {
  			console.log(data);
  			const i =0;
         const pos1= data.object[0].contenu.lastIndexOf('/'); 
         this.path = data.object[0].contenu.substr(0,pos1+1);
          
         console.log(this.path);
         
  			for(i=0;i<data.object.length;i++){
	  			var cours = new Cours(
	  				data.object[i].titre,
	  				data.object[i].description,
	  				data.object[i].contenu.substr(pos1+1,data.object[i].contenu.length),
	  				data.object[i].dateMiseJour
            );
	  			this.listCours[i] = cours;
	  			this.id_cours[i] = data.object[i]._id;
  			}

  			},
  			error => console.log(error)
  	);
  }

   downloadFile(i){
      this.coursService.getFile(this.path+this.listCours[i].contenu).subscribe(
          fileData => FileSaver.saveAs(fileData, "file.pdf")
        );
    }

    modifier(i){
    		localStorage.setItem('idCours',this.id_cours[i]);
          this.router.navigate(['/updateCours'] ;
    		//redirection vers update le cours
    }
    supprimer(i){
    	 this.coursService.removeCours(this.id_cours[i]).subscribe(
        		data => {
             console.log(data);
             window.location.reload();
             },
        		error => console.log(error)
        );

    }

    ajouterCours(){
       localStorage.removeItem("idCours");
       this.router.navigate(['/updateCours'] ; 
    }



    
}
