export class Pack{
	constructor( public titre: String,
				 public description: String,
				 public prix: Number,
				 public type_pack: String,
				 public nb_heure_code?: String,
				 public nb_heure_conduit?: Number,
				 public remise?: Number,
				 public idPack: String
	){}
};
