export class AutoEcole{
	constructor(public email: String,
				public code: String,
				public nom: String,
				public description: String,
				public facebook: String,
				public twitter: String,
				public instagram: String,
				public adresse: String,
				public map: String,
				public logo: String,
				public telephone: String,
				public nomProprietaire: String,
				public prix_heure_code: Number,
				public prix_heure_conduit: Number,
				public prix_heure_code_remise?: Number,
				public prix_heure_conduit_remise?: Number){}
};

           