var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user');
var Quiz = require('./quiz');
var SerieQuiz = require('./serieQuiz');


var playQuiz = new Schema({
	reponseChoisi: {type: String},
	idSerie: {type: Schema.Types.ObjectId, ref: 'SerieQuiz'},
	score: {type: Number},
	idQuiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
	idUser: {type: Schema.Types.ObjectId, ref: 'User'},
	dateReponse: {type: String}

});

module.exports = mongoose.model('PlayQuiz', playQuiz);