var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Contrat = require('./contrat');


var paiement = new Schema({
	tranche: {type: Number},
	datePaiement: {type: String},
	idContrat: {type: Schema.Types.ObjectId, ref: 'Contrat'}

});

module.exports = mongoose.model('Paiement', paiement);