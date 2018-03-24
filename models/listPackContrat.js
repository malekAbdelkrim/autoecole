var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Contrat = require('./contrat');
var Pack = require('./pack');

var listPackContrat = new Schema({
		idPack: {type: Schema.Types.ObjectId, ref: 'Pack'},
		idContrat: {type: Schema.Types.ObjectId, ref: 'Contrat'}
});

module.exports = mongoose.model('ListPackContrat', listPackContrat);