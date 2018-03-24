var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promotion = require('./promotion');
var User = require('./user');




var contrat = new Schema({
	nomUtilisateur: {type: String},
	CIN: {type: String},
	telephone: {type: String},
	email: {type: String},
	date_inscription: {type: String},
	idUser: {type: Schema.Types.ObjectId, ref: 'User'},

	nbHeureConduitSupp: {type: Number},
	nbHeureCodeSupp: {type: String},

	nbHeureCodeTotal: {type: String},
	nbHeureConduitTotal: {type: Number},

	totalPrix: {type: Number},
	totalPrixApresPromo: {type: Number},

	idPromo: {type: Schema.Types.ObjectId, ref: 'Promotion'},

	dateExamenCode: {type: String},
	dateExamenConduit: {type: String},
	reussiteExamenCode: {type: String},
	reussiteExamenConduit: {type:String},
	valableContrat: {type: String}

});

module.exports = mongoose.model('Contrat', contrat);