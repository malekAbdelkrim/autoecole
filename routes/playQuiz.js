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

router.post('/removeAllQuiz', function(req, res, next) {

	PlayQuiz.remove({"idUser": req.body.idUser, "idSerie": req.body.idSerie}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "tous les quiz sont supprimés",
				object: result
			});


	});
	
});

router.post('/getScoreSerie', function(req, res, next){

	PlayQuiz.find({'idUser':req.body.idUser,'idSerie':req.body.idSerie}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "tous les réponses de user",
				object: result
			});


	});
});

module.exports = router;
