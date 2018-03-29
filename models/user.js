var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');



var user = new Schema({
	local: {
		nom: {type : String},
		prenom: {type: String},
		email: {type: String},
		motPasse: {type: String},
		image: {type: String},
		dateNaissance: {type: Date},
		CIN: {type: String}
	},

	facebook: {
		id: String,
		token: String,
		email: String,
		nom: String,
		image: String,
		dateNaissance: String,
		CIN: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		nom: String,
		image: String,
		dateNaissance: String,
		CIN: String
	}
		
});
user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);