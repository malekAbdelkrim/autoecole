export class User {
	constructor(public email: String,
				public motPasse: String,
				public nom?: String,
				public prenom?: String,
				public image?: String,
				public dateNaissance?: String,
				public CIN?: String){}
}