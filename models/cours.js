var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var cours = new Schema({
	titre: {type: String},
	description: {type: String},
	contenu: {type: String},
	dateMiseJour: {type: String}
});

module.exports = mongoose.model('Cours', cours);