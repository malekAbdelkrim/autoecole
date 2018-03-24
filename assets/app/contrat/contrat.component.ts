import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { ContratService } from "./contrat.service";
import { Contrat } from "./contrat.model";
import { User } from "./user.model";
import { Pack } from "./pack.model";
import { PromoArgentReduction } from "./promoArgentReduction.model";
import { PromoPersonneReduction } from "./promoPersonneReduction.model";
import { Router , ActivatedRoute} from "@angular/router";



@Component({
    selector: 'app-contrat',
    templateUrl: './contrat.component.html'
})

export class ContratComponent implements OnInit{
  items: string[] = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  listUser = [];
  listPack = [];
  myForm: FormGroup;
  nbHeureCodeTotal = 0;
  nbHeureConduitTotal = 0;
  nbHeureCodeTotalPack = 0;
  nbHeureConduitTotalPack = 0;
  prixTotal = 0;
  prixTotalPack = 0;
  prixHeureCode = 0;
  prixHeureConduit = 0;
  packCode = "Pack code";
  packConduit = "Pack conduit";
  packCodeConduit = "Pack code et conduit";
  listPackChoisie= [];
  promoArgentRedu = [];
  promoPersonneRedu = [];
  listPackContrat = [];
  existPromo = false;
  prixPromo = 0;
  prixTotalHeureCodeSupp =0;
  prixTotalHeureConduitSupp =0;
  prixTotalHeureCodeSuppPromo =0;
  prixTotalHeureConduitSuppPromo =0;
  existPackPromo = false;
  posPromoListPack;
  prixTotalPackPromo: Integer;
  posChoixReductionPersonne;
  idPromo;
  idUser;  
  updateContrat;
  dateInscription;
  existPack = false;
  packPromo;
  prixTotalPackInter;
  constructor(private contratService: ContratService,private activatedRoute: ActivatedRoute,private cd: ChangeDetectorRef,private router: Router){}


  ngOnInit(){
    this.prixHeureCode = 0;
    this.prixHeureConduit = 0;
    this.promoPackCode = 0;
    this.promoPackConduit = 0;
    this.promoPackCodeConduit = 0;
    this.prixHeureCodePromo = 0;
    this.prixHeureConduitPromo = 0;
    this.prixTotalPackPromo =0;
     this.prixTotalPackInter = 0;
   
this.existPromo = false;

    this.nb_heure_code_supp =0;
    this.nb_heure_conduit_supp=0;
    this.nbHeureCodeTotal =0;
    this.nbHeureConduitTotal =0;
    this.prixTotal =0;
    this.idPromo = null;
    this.prixPromo = 0;
    this.idUser = null;
    this.existPromo = false;
    this.nbHeureCodeTotalPack = null;
this.nbHeureConduitTotalPack = 0;
 this.prixTotalPack =0;
 this.checkedPackPromo = false;






   this.sub = this.activatedRoute.params.subscribe(params => {

       this.idContrat = params['id'];
        
       
    });
   
    if(this.idContrat !== 'nouveau'){
      console.log(this.idContrat);
       this.updateContrat = true;

       this.contratService.getInfoContrat(this.idContrat).subscribe(
            data => {
                      console.log(data);
                      this.idPromo = data.object.idPromo;
                      console.log(this.idPromo);
                       this.idUser = data.object.idUser;
                      document.getElementById("nomUtilisateur").value = data.object.nomUtilisateur;
                      document.getElementById("email").value = data.object.email;
                      document.getElementById("telephone").value = data.object.telephone;
                      document.getElementById("cin").value = data.object.CIN;
                      document.getElementById("nb_heure_conduit_supp").value = data.object.nbHeureConduitSupp;
                      document.getElementById("nb_heure_code_supp").value = data.object.nbHeureCodeSupp;
                      this.dateInscription = data.object.date_inscription;
                      this.nb_heure_code_supp = data.object.nbHeureCodeSupp;
                      this.nb_heure_conduit_supp = data.object.nbHeureConduitSupp;
                      if(data.object.nbHeureCodeTotal === "illimité"){
                          document.getElementById("nb_heure_code_supp").disabled = true;
                      }
                      this.prixTotal = data.object.totalPrix;
                      this.nbHeureCodeTotal =data.object.nbHeureCodeTotal;
                      this.nbHeureConduitTotal =data.object.nbHeureConduitTotal;

                      //Avoir maitenant la liste de pack choisi
                     
                      this.prixPromo = data.object.totalPrixApresPromo;



                      if(this.idPromo !== null){
                          this.existPromo = true;
                           this.contratService.getPromoById(this.idPromo).subscribe(
                            data => {
                                      console.log(data);
                                      if(data.object.pack != undefined){
                                        console.log(data.object.pack);
                                         this.promoPackCode = data.object.pack.promoPackCode;
                                         this.promoPackConduit = data.object.pack.promoPackConduit;
                                         this.promoPackCodeConduit = data.object.pack.promoPackCodeConduit;
                                         console.log(this.promoPackCode+"-----"+this.promoPackConduit+"++++++"+this.promoPackCodeConduit);
                                         for(var i=0;i<this.listPack.length;i++){
                                            if(this.listPack[i].type_pack === "Pack conduit"){
                                               this.listPack[i].remise = this.promoPackConduit;
                                            }
                                            if(this.listPack[i].type_pack === "Pack code"){
                                             this.listPack[i].remise = this.promoPackCode;
                                            }
                                            if(this.listPack[i].type_pack === "Pack code et conduit"){
                                             this.listPack[i].remise = this.promoPackCodeConduit;
                                            }
                                         }
                                         console.log("mise à jour de la liste pack");
                                         console.log(this.listPack);
                                         
                                         this.existPromo = true;
                                      }


                                      if(data.object.prix_code_conduit != undefined){
                                         console.log(data.object.prix_code_conduit);
                                         this.idPromo = data.object._id;
                                         this.prixHeureCodePromo = data.object.prix_code_conduit.prix_code; 
                                         this.prixHeureConduitPromo = data.object.prix_code_conduit.prix_conduit;
                                         this.prixTotalHeureCodeSuppPromo = this.prixHeureCodePromo*this.nb_heure_code_supp;
                                         this.prixTotalHeureConduitSuppPromo = this.prixHeureConduitPromo*this.nb_heure_conduit_supp;
                                         console.log(this.prixTotalHeureCodeSuppPromo+"------------"+this.prixTotalHeureConduitSuppPromo);
                                         this.existPromo = true;
                                       
                                      }
                                      if(data.object.nouveau_pack != undefined){
                                        console.log("il ya un nouveau pack!!!")
                                       console.log(data.object.nouveau_pack);
                                       
                                        this.idPromo = data.object._id;
                                         this.packPromo = new Pack();
                                         this.packPromo.titre = data.object.nouveau_pack.titre;
                                         this.packPromo.description = data.object.nouveau_pack.description;
                                         this.packPromo.prix = data.object.nouveau_pack.prix_total;
                                         this.packPromo.type_pack = "promotion";
                                         this.packPromo.nb_heure_code = data.object.nouveau_pack.nb_heure_code;
                                         this.packPromo.nb_heure_conduit = data.object.nouveau_pack.nb_heure_conduit;
                                         this.packPromo.idPack = data.object._id;
                                         console.log("le pack de promotion est :");
                                         console.log(this.packPromo);
                                         // this.cd.detectChanges();
                                        // this.listPack[this.listPack.length] = this.packPromo;
                                          //document.getElementById(data.object._id).checked = true;
                                         this.existPromo = true;
                                         console.log("apres avoir la promotion");
                                         console.log(this.listPack);
                                         console.log("le longeur de la liste :"+this.listPack.length);
                                          this.existPackPromo = true;
                                          this.listPack[this.listPack.length] = this.packPromo;
                                          
                                            

                                      }

                                       if(data.object.totaliteArgent != undefined){
                                         console.log(data.object.totaliteArgent);
                                         
                                          this.existPromo = true;
                                          this.idPromo = data.object._id;
                                         this.contratService.getPromoArgentReduction(data.object._id).subscribe(
                                            data => {
                                                  console.log(data);
                                                  const i =0;
                                                  for(i=0;i<data.object.length;i++){
                                                    const obj = new PromoArgentReduction(
                                                      data.object[i].prix1,
                                                      data.object[i].prix2,
                                                      data.object[i].reduction
                                                    );
                                                    this.promoArgentRedu[i] = obj;

                                                  }
                                                  console.log(this.promoArgentRedu);
                                                  },
                                            error => console.log(error)
                                          );
          
                                        }

                                      if(data.object.nombrePersonne != undefined){
                                       console.log(data.object.nombrePersonne );
                                        
                                           this.existPromo = true;
                                           this.idPromo = data.object._id;
                                           this.contratService.getPromoPersonneReduction(data.object._id).subscribe(
                                              data => {
                                                    console.log(data);
                                                const i =0;
                                                    for(i=0;i<data.object.length;i++){
                                                    const obj = new PromoPersonneReduction(
                                                    data.object[i].nbPersonne1,
                                                    data.object[i].nbPersonne2,
                                                    data.object[i].reduction

                                                  );
                                                  this.promoPersonneRedu[i] = obj;
                                                }
                                                this.cd.detectChanges();
                                                for(var j=0; j<this.promoPersonneRedu.length;j++){
                                                  const p = (this.prixTotal)*((100-this.promoPersonneRedu[j].reduction)/100);
                                                  console.log("malek:"+p);
                                                   if(this.prixPromo === p){
                                                      document.getElementById("reductionPer"+j).checked = true;
                                                      this.posChoixReductionPersonne = j;
                                                   }
                                                }
                                               
                                                //this.prixPromo
                                                

                                                
                                                console.log(this.promoPersonneRedu);

                                                    },
                                              error => console.log(error)

                                           );
                                        
                                     }


                                    },
                            error => console.log(error)
                        );
                      }

                      
                      },
            error => console.log(error)
        );
        
      
    }else{
      this.updateContrat = false;
      console.log("nouveau contrat");
       this.contratService.getPromo().subscribe(
      data => {
          console.log(data);
          const i = data.object.length - 1;

          if(data.object[i].pack != undefined){
           console.log(data.object[i].pack);
           if(data.object[i].pack.valable === true){
               this.idPromo = data.object[i]._id;
               this.promoPackCode = data.object[i].pack.promoPackCode;
               this.promoPackConduit = data.object[i].pack.promoPackConduit;
               this.promoPackCodeConduit = data.object[i].pack.promoPackCodeConduit;
               console.log(this.promoPackCode+"-----"+this.promoPackConduit+"++++++"+this.promoPackCodeConduit);
               this.existPromo = true;
           }
          }

          if(data.object[i].prix_code_conduit != undefined){
           console.log(data.object[i].prix_code_conduit);

           if(data.object[i].prix_code_conduit.valable === true){
             this.idPromo = data.object[i]._id;
             this.prixHeureCodePromo = data.object[i].prix_code_conduit.prix_code; 
             this.prixHeureConduitPromo = data.object[i].prix_code_conduit.prix_conduit;
             console.log(this.prixHeureCodePromo+"--------"+this.prixHeureConduitPromo);

             this.existPromo = true;
           }
          }

          if(data.object[i].nouveau_pack != undefined){
           console.log(data.object[i].nouveau_pack);
            if(data.object[i].nouveau_pack.valable === true){
            this.idPromo = data.object[i]._id;
             this.packPromo = new Pack();
             this.packPromo.titre = data.object[i].nouveau_pack.titre;
             this.packPromo.description = data.object[i].nouveau_pack.description;
             this.packPromo.prix = data.object[i].nouveau_pack.prix_total;
             this.packPromo.type_pack = "promotion";
             this.packPromo.nb_heure_code = data.object[i].nouveau_pack.nb_heure_code;
             this.packPromo.nb_heure_conduit = data.object[i].nouveau_pack.nb_heure_conduit;
             this.packPromo.idPack = data.object[i]._id;
             console.log(this.packPromo);
             this.existPromo = true;
             console.log(this.listPack);
              this.existPackPromo = true;
           }
          
          }


          if(data.object[i].totaliteArgent != undefined){
           console.log(data.object[i].totaliteArgent);
           if(data.object[i].totaliteArgent.valable === true){
            this.existPromo = true;
            this.idPromo = data.object[i]._id;
           this.contratService.getPromoArgentReduction(data.object[i]._id).subscribe(
              data => {
                    console.log(data);
                    const i =0;
                    for(i=0;i<data.object.length;i++){
                      const obj = new PromoArgentReduction(
                        data.object[i].prix1,
                        data.object[i].prix2,
                        data.object[i].reduction
                      );
                      this.promoArgentRedu[i] = obj;
                    }
                    console.log(this.promoArgentRedu);
                    },
              error => console.log(error)
            );
           
           }
            
          }
          if(data.object[i].nombrePersonne != undefined){
           console.log(data.object[i].nombrePersonne );
            if(data.object[i].nombrePersonne.valable === true){
               this.existPromo = true;
               this.idPromo = data.object[i]._id;
               this.contratService.getPromoPersonneReduction(data.object[i]._id).subscribe(
                  data => {
                        console.log(data);
                    const i =0;
                        for(i=0;i<data.object.length;i++){
                        const obj = new PromoPersonneReduction(
                        data.object[i].nbPersonne1,
                        data.object[i].nbPersonne2,
                        data.object[i].reduction
                      );
                      this.promoPersonneRedu[i] = obj;
                    }
                    console.log(this.promoPersonneRedu);

                        },
                  error => console.log(error)

               );
            }
          }
          

          },
      error => console.log(error)
  );
    }
  
  console.log(this.packPromo);
 
   this.contratService.getInfoAutoEcole().subscribe(
   		data => {
   			console.log(data);
   			console.log(data.object[0].prix_heure_code+"-----*****----"+data.object[0].prix_heure_conduit);
   			
   				 this.prixHeureCode = data.object[0].prix_heure_code;
            	 this.prixHeureConduit = data.object[0].prix_heure_conduit;
   			
   		   
             console.log(this.prixHeureCode+"-------"+this.prixHeureConduit);
             
   		},
   		error => console.log(error)
   );


   
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

  this.contratService.getAllPack().subscribe(
  			data => {
  				console.log(data);
  				const i =0;
  				const heureCode = "0";
  				const heureConduit = 0;
          

         

  				for(i=0;i<data.object.length;i++){
  					if(data.object[i].nb_heure_code == null || data.object[i].nb_heure_code == undefined){
  							heureCode = "0";
  					} else {
  							heureCode = data.object[i].nb_heure_code;
  					}

  					if(data.object[i].nb_heure_conduit == null || data.object[i].nb_heure_conduit == undefined){
  							heureConduit = 0;
  					} else {
  							heureConduit = data.object[i].nb_heure_conduit;
  					}

  					const pack = new Pack();
  					pack.titre = data.object[i].titre;
  					pack.description = data.object[i].description;
  					pack.type_pack = data.object[i].type_pack;
  					pack.prix = data.object[i].prix;
  					pack.nb_heure_code = heureCode;
  					pack.nb_heure_conduit = heureConduit;
  					if(data.object[i].type_pack === "Pack conduit"){
  						pack.remise = this.promoPackConduit;
  					}
  					if(data.object[i].type_pack === "Pack code"){
  						pack.remise = this.promoPackCode;
  					}
  					if(data.object[i].type_pack === "Pack code et conduit"){
  						pack.remise = this.promoPackCodeConduit;
  					}
  					 
  					pack.idPack = data.object[i]._id;
  					this.listPack[i] = pack;

  				}
          if(this.packPromo !== undefined){
            this.listPack[this.listPack.length] = this.packPromo;
          }
           if(this.listPack.length > 0){
            this.existPack = true;
          }
          
          
          if(this.updateContrat === true){
             this.contratService.getPackContrat(this.idContrat).subscribe(
                          data => {
                                    console.log(data);
                                    this.cd.detectChanges();
                                    
                                    for(var i=0; i<data.object.length;i++){
                                       document.getElementById(data.object[i].idPack).checked = true;
                                      for(var j=0;j<this.listPack.length;j++){
                                        if(this.listPack[j].idPack === data.object[i].idPack){
                                            this.listPackChoisie[i] = this.listPack[j];

                                            this.nbHeureConduitTotalPack += this.listPack[j].nb_heure_conduit;
                                            if(this.listPack[j].nb_heure_code === "illimité"){
                                              this.nbHeureCodeTotalPack = "illimité";
                                            } 
                                            if(this.nbHeureCodeTotalPack !== "illimité" & this.listPack[j].nb_heure_code !== "illimité"){
                                               this.nbHeureCodeTotalPack += parseInt(this.listPack[j].nb_heure_code);
                                            }
                                            this.prixTotalPack += this.listPack[j].prix;
                                            console.log(this.nbHeureConduitTotalPack+"+++++"+this.nbHeureCodeTotalPack+"-----"+this.prixTotalPack);
                                        }
                                      }
                                      
                                    }
                                  

                                    this.prixTotalPackInter = this.prixTotal-((this.nb_heure_code_supp * this.prixHeureCode)+(this.nb_heure_conduit_supp * this.prixHeureConduit));
                                    if(this.prixTotalPackInter> this.prixTotalPack){
                                        this.listPackChoisie[this.listPackChoisie.length] = this.listPack[this.listPack.length-1];
                                         document.getElementById(this.listPack[this.listPack.length-1].idPack).checked = true;
                                         this.prixTotalPack = this.prixTotalPackInter;
                                          this.nbHeureConduitTotalPack += this.listPack[this.listPack.length-1].nb_heure_conduit;
                                            if(this.listPack[this.listPack.length-1].nb_heure_code === "illimité"){
                                              this.nbHeureCodeTotalPack = "illimité";
                                            } 
                                            if(this.nbHeureCodeTotalPack !== "illimité" & this.listPack[this.listPack.length-1].nb_heure_code !== "illimité"){
                                               this.nbHeureCodeTotalPack += parseInt(this.listPack[this.listPack.length-1].nb_heure_code);
                                            }

                                    }
                                      this.prixTotalPackPromo = this.prixTotalPack;
                                      if(this.promoPackCode!== 0 || this.promoPackConduit !==0 || this.promoPackConduit !== 0){
                                      console.log("hello");
                                        this.prixTotalPackPromo = this.prixTotalPack-(this.prixTotal-this.prixPromo);
                                      }
                                      
                                    


                                  
                                   // console.log(this.idPromo);
                                  
                                    },
                          error => console.log(error)
                      );

      
          }
  			
  				
  				console.log(this.listPack);
          console.log("le longeur de tableau:"+this.listPack.length);

           
              /*if(this.prixTotalPack< prixTotalPackInter){
                var i =0;
                var bl = false;
                  console.log("teste de prix");
              }*/


  			},
  			error => console.log(error)
  );

  	this.myForm = new FormGroup({
			nomUtilisateur: new FormControl(null),
			email: new FormControl(null),
			telephone: new FormControl(null),
			cin: new FormControl(null),
			nb_heure_code_supp: new FormControl(null),
			nb_heure_conduit_supp: new FormControl(null)

		});
      
     
  }

  getNomUtilisateur(id){
    this.idUser =  this.listUser[id].idUser;
  	document.getElementById("user").value = this.listUser[id].nomComplet;
  	document.getElementById("nomUtilisateur").value = this.listUser[id].nomComplet;
  	document.getElementById("email").value = this.listUser[id].email;
  console.log(this.listUser[id].nomComplet);
  }

  getCheckedPack(i){
	  if(document.getElementById(this.listPack[i].idPack).checked === true){
	  		console.log(this.listPack[i].idPack);
	  		this.listPackChoisie[this.listPackChoisie.length] = this.listPack[i];
	  		if(this.listPack[i].nb_heure_code === "illimité" || this.nbHeureCodeTotal === "illimité"){
	  				this.nbHeureCodeTotalPack = "illimité";
	  				this.nbHeureCodeTotal = "illimité";
	  		} else{
	  				this.nbHeureCodeTotal  += parseInt(this.listPack[i].nb_heure_code);
	  				this.nbHeureCodeTotalPack  += parseInt(this.listPack[i].nb_heure_code);
	  		}
			this.nbHeureConduitTotalPack +=this.listPack[i].nb_heure_conduit;
			this.nbHeureConduitTotal +=this.listPack[i].nb_heure_conduit;
			this.prixTotalPack += this.listPack[i].prix;
			this.prixTotalPackPromo += this.listPack[i].prix*((100-this.listPack[i].remise)/100);
			this.prixTotal += this.listPack[i].prix;
			this.prixPromo += this.listPack[i].prix*((100-this.listPack[i].remise)/100);
			console.log(this.prixTotalPackPromo+"------"+this.prixTotalPack);
			this.getPrixPromo(this.prixTotal);
			
			

			console.log(this.listPackChoisie);
	  } else{
	  		const bl = false;
	  		const j =0;
	  		const pos =0;
	  		while(j<this.listPackChoisie.length && bl == false){
	  			if(this.listPackChoisie[j].idPack === this.listPack[i].idPack){
	  				pos = j;
	  				bl = true;
	  			} else {
	  				j++;
	  			}
	  		}
	  		const el = this.listPackChoisie.splice(pos, 1);
	  		console.log(el);
	  		this.nbHeureConduitTotal -=this.listPack[i].nb_heure_conduit;
	  		this.nbHeureConduitTotalPack -=this.listPack[i].nb_heure_conduit;
			this.prixTotal -= this.listPack[i].prix;
			this.prixTotalPack -= this.listPack[i].prix;
			this.prixTotalPackPromo -= this.listPack[i].prix*((100-this.listPack[i].remise)/100);
			this.prixPromo -= this.listPack[i].prix*((100-this.listPack[i].remise)/100);
			this.getPrixPromo(this.prixTotal);
			const j=0;
			const bl = false;
      const nbHeureCodePackN =0;
			while(j<this.listPackChoisie.length && bl == false){
	  			if(this.listPackChoisie[j].nb_heure_code === "illimité"){
	  				nbHeureCodePackN = "illimité";
            bl = true;
	  			} else {
	  				nbHeureCodePackN += parseInt(this.listPackChoisie[j].nb_heure_code);
	  				j++;
	  			}
	  		}
        console.log(nbHeureCodePackN);
        console.log(this.nbHeureCodeTotal);
        if(nbHeureCodePackN === "illimité"){
                this.nbHeureCodeTotal = nbHeureCodePackN;
                console.log(nbHeureCodePackN+"*******"+this.nbHeureCodeTotal);
                this.nbHeureCodeTotalPack = nbHeureCodePackN;
        }else{
              this.nbHeureCodeTotal = nbHeureCodePackN+ this.nb_heure_code_supp;
               console.log(nbHeureCodePackN+"*******"+this.nbHeureCodeTotal);
                this.nbHeureCodeTotalPack = nbHeureCodePackN; 
        }
	  		//this.nbHeureCodeTotal = this.nb_heure_code_supp;


	  		console.log(this.listPackChoisie);
	  }

	  if(this.nbHeureCodeTotalPack === "illimité"){
	  	 //document.getElementById("nb_heure_code_supp").value = "";

   		 document.getElementById("nb_heure_code_supp").disabled = true;

  	  }else{
  	  	 document.getElementById("nb_heure_code_supp").disabled = false;
  	  }
  		console.log(i);
  }

  getnb_heure_code_supp(){
 	console.log(document.getElementById("nb_heure_code_supp").value);
   if(document.getElementById("nb_heure_code_supp").value === ""){
  		this.nb_heure_code_supp = 0;
  		console.log("malek");
      console.log("hello this is the first hour of code :"+this.prixHeureCodePromo);
  		this.nbHeureCodeTotal =this.nb_heure_code_supp+this.nbHeureCodeTotalPack;
  		 this.prixTotalHeureCodeSupp = this.nb_heure_code_supp*this.prixHeureCode;
  		 this.prixTotal = this.prixTotalHeureCodeSupp+this.prixTotalHeureConduitSupp+this.prixTotalPack;

        
        console.log("deja calculer");
        console.log("le prix de heure code :"+this.prixHeureCodePromo+"------"+this.prixHeureCode);
  		//this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
  		 if(this.prixHeureCodePromo ===0 & this.prixHeureConduitPromo==0){
           
            this.prixPromo = this.prixTotalHeureCodeSupp+ this.prixTotalHeureConduitSupp +this.prixTotalPack;
  	        this.getPrixPromo(this.prixTotal);
            console.log("pas de promotion");

  	    }else{
           console.log("on a promotion");
           console.log("prix heure code promo :"+this.prixHeureCodePromo);
           console.log("nb heure code :"+this.nb_heure_code_supp);
           console.log("prix total de code avec la promotion :"+this.prixTotalHeureCodeSuppPromo);
           this.prixTotalHeureCodeSuppPromo = this.nb_heure_code_supp*this.prixHeureCodePromo;
  	    	 this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
            this.getPrixPromo(this.prixPromo);

  	    }
  
  	    
  	   
  	    console.log(this.prixTotal+"--***---"+this.prixPromo)

  	} else {
  		this.nb_heure_code_supp=  parseInt(document.getElementById("nb_heure_code_supp").value);
  	    this.nbHeureCodeTotal =this.nb_heure_code_supp+this.nbHeureCodeTotalPack;

  	    this.prixTotalHeureCodeSupp = this.nb_heure_code_supp*this.prixHeureCode;
  		this.prixTotalHeureCodeSuppPromo = this.nb_heure_code_supp*this.prixHeureCode;
  
  	    this.prixTotal = this.prixTotalHeureCodeSupp+this.prixTotalHeureConduitSupp+this.prixTotalPack;
  	   // this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
  	    if(this.prixHeureCodePromo ===0 & this.prixHeureConduitPromo==0){
           
            this.prixPromo = this.prixTotalHeureCodeSupp+ this.prixTotalHeureConduitSupp +this.prixTotalPack;
  	        this.getPrixPromo(this.prixTotal);
             console.log("pas de promotion");

  	    }else{
        this.prixTotalHeureCodeSuppPromo = this.nb_heure_code_supp*this.prixHeureCodePromo;
  	    	 this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
            this.getPrixPromo(this.prixPromo);

            console.log("on a de promotion");
            console.log("prix heure code promo :"+this.prixHeureCodePromo);
           console.log("nb heure code :"+this.nb_heure_code_supp);
           console.log("prix total de code avec la promotion :"+this.prixTotalHeureCodeSuppPromo);
  	    }
  	 
  	}


  }

  getnb_heure_conduit_supp(){
  	console.log(document.getElementById("nb_heure_conduit_supp").value);
  	if(document.getElementById("nb_heure_conduit_supp").value === ""){
  		this.nb_heure_conduit_supp = 0;
  		console.log("malek");
  		this.nbHeureConduitTotal =this.nb_heure_conduit_supp+this.nbHeureConduitTotalPack;

  		this.prixTotalHeureConduitSupp = this.nb_heure_conduit_supp*this.prixHeureConduit;
  	
  	    this.prixTotal = this.prixTotalHeureCodeSupp+this.prixTotalHeureConduitSupp+this.prixTotalPack;
  	   // this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
  	  	  if(this.prixHeureCodePromo ===0 & this.prixHeureConduitPromo==0){
           
            this.prixPromo = this.prixTotalHeureCodeSupp+ this.prixTotalHeureConduitSupp +this.prixTotalPack;
  	        this.getPrixPromo(this.prixTotal);

  	    }else{
          this.prixTotalHeureConduitSuppPromo = this.nb_heure_conduit_supp*this.prixHeureConduitPromo;
  
  	    	 this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
           this.getPrixPromo(this.prixPromo);

  	    }
  	    
  	    
  	     console.log(this.prixTotal+"--***---"+this.prixPromo)

  	} else {
  		this.nb_heure_conduit_supp=  parseInt(document.getElementById("nb_heure_conduit_supp").value);
  	    this.nbHeureConduitTotal =this.nb_heure_conduit_supp+this.nbHeureConduitTotalPack;
  	    this.prixTotalHeureConduitSupp = this.nb_heure_conduit_supp*this.prixHeureConduit;
  		this.prixTotalHeureConduitSuppPromo = this.nb_heure_conduit_supp*this.prixHeureConduitPromo;
  
  	    this.prixTotal = this.prixTotalHeureCodeSupp+this.prixTotalHeureConduitSupp+this.prixTotalPack;
  	    if(this.prixHeureConduitPromo ===0){
           
            this.prixPromo = this.prixTotalHeureCodeSupp+ this.prixTotalHeureConduitSupp +this.prixTotalPack;
  	        this.getPrixPromo(this.prixTotal);

  	    }else{
         this.prixTotalHeureConduitSuppPromo = this.nb_heure_conduit_supp*this.prixHeureConduitPromo;
  	    	 this.prixPromo = this.prixTotalHeureCodeSuppPromo+ this.prixTotalHeureConduitSuppPromo +this.prixTotalPack;
            this.getPrixPromo(this.prixPromo);
  	    }
  	   
 console.log(this.prixTotal+"--***---"+this.prixPromo);
  	     

  	}
  	 

  }


  getPrixPromo(prixTotal){
  		
  		if(this.promoArgentRedu.length >0){
  			console.log("promo argent red");
  			this.prixPromo = prixTotal;
  			const i =0;
  			const bl = false;
  			while(i<this.promoArgentRedu.length & bl ===false){
  				if(this.promoArgentRedu[i].prix2 == "illimité"){
  						if(prixTotal >= this.promoArgentRedu[i].prix1){
  							this.prixPromo = prixTotal*((100-this.promoArgentRedu[i].reduction)/100);
  							console.log(prixTotal*((100-this.promoArgentRedu[i].reduction)/100));
  							bl = true;
  						}else{
  							i++;
  						}
  				}else{
  					const prix2 = parseFloat(this.promoArgentRedu[i].prix2);
  					if(prixTotal >= this.promoArgentRedu[i].prix1 &  prixTotal <= prix2){
  						this.prixPromo = prixTotal*((100-this.promoArgentRedu[i].reduction)/100);
  						console.log(prixTotal*((100-this.promoArgentRedu[i].reduction)/100));
  						bl = true;
              this.prixPromo = prixTotal*((100-this.promoArgentRedu[i].reduction)/100);
  					} else{
  						i++;
  					}

  				}
  			}
        return(this.prixPromo);
  		}


  		if(this.prixTotalPackPromo < this.prixTotalPack){
  			console.log("promo pack");
  			this.prixPromo =  prixTotal - this.prixTotalPack + this.prixTotalPackPromo;
         return(this.prixPromo);

  		}

      if(this.promoPersonneRedu.length >0){
        console.log(this.posChoixReductionPersonne);
        if(this.promoPersonneRedu[this.posChoixReductionPersonne] === undefined){
          this.prixPromo = prixTotal;
        } else{
            this.prixPromo = prixTotal*((100-this.promoPersonneRedu[this.posChoixReductionPersonne].reduction)/100);
        }
         return(this.prixPromo);
        
      }

        if(this.prixHeureCodePromo !==0 & this.prixHeureConduitPromo !== 0){
            console.log("kiiiiiiiiiiikiiiiiii");
            return(this.prixPromo);
        }


      this.prixPromo = prixTotal;
       return(this.prixPromo);

  	}

    getReductionPersonne(i){
      this.posChoixReductionPersonne = i;
      console.log(i);
      this.getPrixPromo(this.prixTotal);
    }

    onSubmit(){
    if(this.updateContrat === true){
        var dateInscription1 = this.dateInscription;

      
    }else
    {
        var currentTime = new Date();
        var month = ("0" + (currentTime.getMonth()+1)).slice(-2);
        var day = ("0" + currentTime.getDate()).slice(-2);
        var year = currentTime.getFullYear();
    
        var hour = ("0" + currentTime.getHours()).slice(-2);
        var minute = ("0" + currentTime.getMinutes()).slice(-2);
    
        var dateInscription1 = (day + "/" + month + "/" + year + " "+ hour + ":"+ minute);
   }
      console.log(dateInscription1);
      console.log(this.idPromo);
       console.log(this.idUser);
      console.log(this.prixTotal);
      console.log(this.prixPromo);
      console.log(this.nbHeureCodeTotal);
      console.log(this.nbHeureConduitTotal);
      console.log(this.nb_heure_code_supp);
      console.log(this.nb_heure_conduit_supp);
      this.filtrerListPackChoisie();
      const contrat = new Contrat(
          this.idUser,
          document.getElementById("nomUtilisateur").value,
          document.getElementById("cin").value,
           document.getElementById("email").value,
           document.getElementById("telephone").value,
           dateInscription1,
           this.nb_heure_code_supp,
           this.nb_heure_conduit_supp,
           this.nbHeureCodeTotal,
           this.nbHeureConduitTotal,
           this.prixTotal,
           this.idPromo,
           this.prixPromo
      );
      console.log(contrat);
      if(this.updateContrat === false){
       this.contratService.ajouterContrat(contrat).subscribe(
            data => {
                      console.log(data);
                      
                             const j =0;
                            for(j=0;j<this.listPackChoisie.length;j++){
                              this.contratService.ajouterListPackContrat(data.obj._id,this.listPackChoisie[j].idPack).subscribe(
                                              data => console.log(data),
                                              error => console.log(error)
                                         );
                              }
                      },
            error => console.log(error)
            );
      }
      else{
            console.log("on va modifier le contrat");
           this.contratService.updateContrat(contrat,this.idContrat).subscribe(
                    data => {
                              console.log(data);
                            },
                    error => console.log(error)
          );
          this.contratService.supprimerTousListPackContrat(this.idContrat).subscribe(
                                  data => {console.log(data)},
                                  error => console.log(error)
                                  );
            for(var j=0;j<this.listPackChoisie.length;j++){
                  this.contratService.ajouterListPackContrat(this.idContrat,this.listPackChoisie[j].idPack).subscribe(
                                  data => console.log(data),
                                  error => console.log(error)
                                         );
                }

      }
      this.router.navigate(['/contrat']);
     
    }

    filtrerListPackChoisie(){
      const i =0;
      const bl = false;
      while(i< this.listPackChoisie.length & bl == false){
        if(this.listPackChoisie[i].type_pack === 'promotion'){
            bl = true;
            this.listPackChoisie.splice(i, 1);
            

        }else{
          i++;
        }
       
      }
      console.log(this.listPackChoisie);

    }


}