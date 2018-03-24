var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serieQuiz = new Schema({
	 titreSerie: {type: String}         
	
});
module.exports = mongoose.model('SerieQuiz', serieQuiz);