var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promotion = require('./promotion')


var promotionNbPersonneReduction = new Schema({
	nbPersonne1: {type: Number},
	nbPersonne2: {type: String},
	reduction: {type: Number},
	promo: {type: Schema.Types.ObjectId, ref: 'Promotion'}

});

module.exports = mongoose.model('PromotionNbPersonneReduction', promotionNbPersonneReduction);