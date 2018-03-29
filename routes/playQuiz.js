var express = require('express');
var router = express.Router();
var PlayQuiz = require('../models/playQuiz')

/* GET home page. */
router.post('/ajouterReponse', function(req, res, next){

	var play = new PlayQuiz({
			reponseChoisi: req.body.reponseChoisi,
			idSerie: req.body.idSerie,
			score: req.body.score,
			idQuiz: req.body.idQuiz,
			idUser: req.body.idUser,
			dateReponse: req.body.dateReponse
	});

	play.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "on enregistre maintenant une quiz",
					obj: result
				});
	});

});

module.exports = router;
