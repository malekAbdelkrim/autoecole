import { Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { ContratService } from "./contrat.service";
import { Contrat } from "./contrat.model";
import { User } from "./user.model";
import { Router , ActivatedRoute} from "@angular/router";
import { FilterPipe } from "./filterPipe.pipe";




@Component({
    selector: 'app-accueilcontrat',
    templateUrl: './acceuilContrat.component.html',
    pipes: [FilterPipe]
    
})



export class AccueilContratComponent implements OnInit,AfterViewInit{

 listUser = [];
 listContrat: Contrat[];
 idListContrat = [];
  date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: false,
        format: 'dd-MM-yyyy HH:mm',
        defaultOpen: false,
        timePicker: true
    }
 constructor(private contratService: ContratService, private cd: ChangeDetectorRef,private router: Router){}
 ngAfterViewInit(){
 this.listContrat = [];
 this.myName = 'malek';
  
  this.contratService.findAllUser().subscribe(
      data => {
            console.log(data);
            const i =0;
            console.log(data.object[0].facebook);
            for(i=0;i<data.object.length;i++){
              if(data.object[i].local != undefined){
                  const user = new User(
                      data.object[i].local.nom,
                      data.object[i].local.image,
                      data.object[i].local.email,
                      data.object[i]._id

                  );
              }

              if(data.object[i].facebook != undefined){
                  const user = new User(
                      data.object[i].facebook.nom,
                      data.object[i].facebook.image,
                      data.object[i].facebook.email,
                      data.object[i]._id

                  );
              }

              if(data.object[i].google != undefined){

                const user = new User(
                      data.object[i].google.nom,
                      data.object[i].google.image,
                      data.object[i].google.email,
                      data.object[i]._id

                  );

              }

              this.listUser[i] = user;
            }
            console.log(this.listUser);
            },
      error => console.log(error)
  );

   this.contratService.getAllContrat().subscribe(
      data => {
                console.log(data);
                const i =0;
                for(i=0; i<data.object.length;i++){
                  const contrat = new Contrat();
                  contrat.id_user = data.object[i].idUser;
                  contrat.nomComplet = data.object[i].nomUtilisateur;
                  contrat.dateInscription = data.object[i].date_inscription;
                  console.log(contrat);
                  this.listContrat[i] = contrat;
                  this.idListContrat[i] = data.object[i]._id;
                  console.log(data.object[i].dateExamenConduit);
                   console.log(data.object[i].reussiteExamenCode);
                  this.cd.detectChanges();
                  if(data.object[i].dateExamenCode !== undefined){
                      document.getElementById("dateexamencode"+i).innerHTML = data.object[i].dateExamenCode; 
                  } 

                  if(data.object[i].dateExamenConduit !== undefined){
                      document.getElementById("dateexamenconduit"+i).innerHTML = data.object[i].dateExamenConduit; 
                  } 

                  if(data.object[i].reussiteExamenCode !== undefined){
                        document.getElementById(data.object[i].reussiteExamenCode+"code"+i).checked = true;

                  }

                  if(data.object[i].reussiteExamenConduit !== undefined){
                        document.getElementById(data.object[i].reussiteExamenConduit+"conduit"+i).checked = true;

                  }

                

                   
                }
                },
      error => console.log(error)

  )

 }

 ngOnInit(){
 

 }
 getNomUtilisateur(id){
    this.idUser =  this.listUser[id].idUser;
    console.log(this.listUser[id]);
  }

  updateDateExamenCode(parm2,i){
    console.log("malek"+parm2.getFullYear());

    //faire update à la date de examen
    var month = ("0" + (parm2.getMonth()+1)).slice(-2);
    var day = ("0" + parm2.getDate()).slice(-2);
    var year = parm2.getFullYear();

    var hour = ("0" + parm2.getHours()).slice(-2);
    var minute = ("0" + parm2.getMinutes()).slice(-2);
    var dt = day + "/"+ month + "/" + year + " "+ hour+":"+minute;

    // update maintenant le date de examen
    this.contratService.updateDateExamenCode(this.idListContrat[i],dt).subscribe(
        data => {
                  console.log(data);
                   document.getElementById("dateexamencode"+i).innerHTML = dt; 
        },
        error => console.log(error)
    )
      

    

  }


updateDateExamenConduit(parm2,i){

    console.log("malek"+parm2.getFullYear());

    //faire update à la date de examen
    var month = ("0" + (parm2.getMonth()+1)).slice(-2);
    var day = ("0" + parm2.getDate()).slice(-2);
    var year = parm2.getFullYear();

    var hour = ("0" + parm2.getHours()).slice(-2);
    var minute = ("0" + parm2.getMinutes()).slice(-2);
    var dt = day + "/"+ month + "/" + year + " "+ hour+":"+minute;

    // update maintenant le date de examen
    this.contratService.updateDateExamenConduit(this.idListContrat[i],dt).subscribe(
        data => {
                  console.log(data);
                   document.getElementById("dateexamenconduit"+i).innerHTML = dt; 
        },
        error => console.log(error)
    )
      

  
}
reussiCode(j){
    console.log("malek"+j);
      var boutons = document.getElementsByName("reussicode");
      for(var i = 0; i < boutons.length; i++){
         if(boutons[i].checked){
         this.correctButton = boutons[i].value;
         }
      }

      console.log(this.correctButton);

      //on va mettre à jour la réussite de examen code
      this.contratService.updateReussiCode(this.idListContrat[j],this.correctButton).subscribe(
          data => console.log(data),
          error => console.log(error)

      );

   
 }

 reussiConduit(j){
  console.log("malek"+j);
      var boutons = document.getElementsByName("reussiconduit");
      for(var i = 0; i < boutons.length; i++){
         if(boutons[i].checked){
         this.correctButton = boutons[i].value;
         }
      }

      console.log(this.correctButton);

      //on va mettre à jour la réussite de examen code
      this.contratService.updateReussiConduit(this.idListContrat[j],this.correctButton).subscribe(
          data => console.log(data),
          error => console.log(error)

      );

 }

 modifierContrat(i){
        this.router.navigate(['/updateContrat', this.idListContrat[i]]);

 }

 supprimerContrat(i){
       this.contratService.supprimerContrat(this.idListContrat[i]).subscribe(
          data => console.log(data),
          error => console.log(error)

      );
 }

 infoContrat(i){
    this.router.navigate(['/detailContrat', this.idListContrat[i]]);

 }

 ajouterContrat(){
    this.router.navigate(['/updateContrat', 'nouveau']);
 }

	
}