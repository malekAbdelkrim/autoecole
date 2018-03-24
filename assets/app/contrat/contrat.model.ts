export class Contrat{
	constructor( public id_user: String,
				 public nomComplet: String,
				 public CIN: String,
				 public email: String,
				 public telephone: String,
				 public dateInscription: String,
				 public nbHeureCodeSupp: String,
				 public nbHeureConduitSupp: Number,
				 public nbHeureCodeTotal: String,
				 public nbHeureConduitTotal: Number,
				 public prixTotal: Number,
				 public idPromo: String,
				 public prixTotalApresPromo: Number
	){}
};
