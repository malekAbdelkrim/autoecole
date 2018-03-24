var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Pack = require('./pack');


var detailPack = new Schema({
	detail: {type: String},
	pack: {type: Schema.Types.ObjectId, ref: 'Pack'}

});

module.exports = mongoose.model('DetailPack', detailPack);