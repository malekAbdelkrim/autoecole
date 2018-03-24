var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SerieQuiz = require('./serieQuiz');
var quiz = new Schema({
	 			question: {type: String},
				image: {type: String},
				reponse1: {type: String},
				reponse2: {type: String},
				reponse3: {type: String},
				repCorrect: {type: String},
				idSerie: {type: Schema.Types.ObjectId, ref: 'SerieQuiz'}         
	
});
module.exports = mongoose.model('Quiz', quiz);