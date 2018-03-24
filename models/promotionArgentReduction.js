var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promotion = require('./promotion')


var promotionArgentReduction = new Schema({
	prix1: {type: Number},
	prix2: {type: String},
	reduction: {type: Number},
	promo: {type: Schema.Types.ObjectId, ref: 'Promotion'}

});

module.exports = mongoose.model('PromotionArgentReduction', promotionArgentReduction);