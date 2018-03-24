var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AutoEcole = require('./autoecole')


var professeur = new Schema({
	nom: {type: String},
	prenom: {type: String},
	CIN: {type: String},
	img: {type: String},
	type_cours: {type: String},
	description: {type: String},
	date_depart: {type: Date},
	adresse: {type: String},
	telephone: {type: String},
	email: {type: String},
	autoEcole: {type: Schema.Types.ObjectId, ref: 'AutoEcole'}

});

module.exports = mongoose.model('Professeur', professeur);