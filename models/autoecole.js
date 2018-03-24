var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoecole = new Schema({
	code: {type: String},
	email: {type: String},
	nom: {type: String},
	description: {type: String},
	facebook: { type: String},
	twitter: {type: String},
	instagram: {type: String},
	map: {type: String},
	nomProprietaire: {type: String},
	adresse: {type: String},
	telephone: {type: String},
	logo: {type: String},
	prix_heure_code:{ type: Number},
	prix_heure_conduit: {type: Number}
});
module.exports = mongoose.model('AutoEcole', autoecole);