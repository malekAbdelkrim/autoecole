var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promotion = require('./promotion');
var User = require('./user');

var avis = new Schema({
		commentaire: {type: String},
		nbVoiture: {type: Number},
		dateCommentaire: {type: String},
		idUser: {type: Schema.Types.ObjectId, ref: 'User'}

});

module.exports = mongoose.model('Avis', avis);