var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AutoEcole = require('./autoecole')

var horaireauto = new Schema({
	jour: {type: String},
	heure_ouv_matin: {type: String},
	heure_ferm_matin: {type: String},
	heure_ouv_soir: {type: String},
	heure_ferm_soir: {type: String},
	autoEcole: {type: Schema.Types.ObjectId, ref: 'AutoEcole'}

});
module.exports = mongoose.model('HoraireAuto', horaireauto);