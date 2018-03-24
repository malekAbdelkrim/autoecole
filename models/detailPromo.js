var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Promotion = require('./promotion');


var detailPromo = new Schema({
	detail: {type: String},
	promo: {type: Schema.Types.ObjectId, ref: 'Promotion'}

});

module.exports = mongoose.model('DetailPromo', detailPromo);