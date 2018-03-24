var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pack = new Schema({
	            titre: {type: String},
				description: {type: String},
				nb_heure_code: {type: String},
				nb_heure_conduit: {type: Number},
				prix: {type: Number},
				type_pack: {type: String},
				remise: {type: Number}
	
});
module.exports = mongoose.model('Pack', pack);