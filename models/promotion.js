var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var AutoEcole = require('./autoecole')


var promotion = new Schema({

	pack: {
		date_depart: {type: Date},
		date_expiration: {type: Date},
		image: {type: String},
		titre: {type: String},
		description: {type: String},
		promoPackCode: {type: Number},
		promoPackConduit: {type: Number},
		promoPackCodeConduit: {type: Number},
		valable: {type: Boolean},
		historique: {type: Boolean}
	},
	prix_code_conduit:{
		date_depart: {type: Date},
		date_expiration: {type: Date},
		image: {type: String},
		titre: {type: String},
		description: {type: String},
		prix_code: {type: Number},
		prix_conduit: {type: Number},
		valable: {type: Boolean},
		historique: {type: Boolean}
	},
	nouveau_pack:{
		date_depart: {type: Date},
		date_expiration: {type: Date},
		image: {type: String},
		titre: {type: String},
		description: {type: String},
		nb_heure_code: {type: Number},
		nb_heure_conduit: {type: Number},
		prix_total: {type: Number},
		valable: {type: Boolean},
		historique: {type: Boolean}
	},
	totaliteArgent: {
		date_depart: {type: Date},
		date_expiration: {type: Date},
		image: {type: String},
		titre: {type: String},
		description: {type: String},
		valable: {type: Boolean},
		historique: {type: Boolean}
	},
	nombrePersonne:{
		date_depart: {type: Date},
		date_expiration: {type: Date},
		image: {type: String},
		titre: {type: String},
		description: {type: String},
		valable: {type: Boolean},
		historique: {type: Boolean}
	}
	

});

module.exports = mongoose.model('Promotion', promotion);