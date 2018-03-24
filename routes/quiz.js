var express = require('express');
var router = express.Router();
var Quiz = require('../models/quiz');
var SerieQuiz = require('../models/serieQuiz');
var multer = require('multer');

var storage = multer.diskStorage({
			  // destination
	destination: function (req, file, cb) {
	  cb(null, './public/images/quiz/')
		},
    filename: function (req, file, cb) {
		cb(null, file.originalname);
	 }
 });
 var upload = multer({ storage: storage });

 router.post("/upload_imgquiz", upload.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});
 


router.post('/getAllSerie', function(req, res, next){

	SerieQuiz.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "tous les séries de quiz",
				object: result
			});


	});

});

router.post('/ajouterSerie', function(req, res, next){

	var serie = new SerieQuiz({
		 		titreSerie: req.body.titreSerie
	});

	serie.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "une nouvelle série",
					obj: result
				});
	});
});

router.post('/supprimerSerie', function(req, res, next) {
		
		SerieQuiz.remove({_id: req.body.idSerie}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Cette serie est supprimé",
				object: result
			});


	});
	

});

router.post('/ajouterQuiz', function(req, res, next){

	var quiz = new Quiz({
				question: req.body.question,
				image: req.body.image,
				reponse1: req.body.reponse1,
				reponse2: req.body.reponse2,
				reponse3: req.body.reponse3,
				repCorrect: req.body.repCorrect,
				idSerie: req.body.idSerie
		 		
	});

	quiz.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "une nouvelle quiz",
					obj: result
				});
	});
         

});

router.post('/getAllQuizSerie', function(req, res, next){

	Quiz.find({'idSerie': req.body.idSerie}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "tous les les quiz qu'on a",
				object: result
			});


	});

});

router.post('/supprimerQuiz', function(req, res, next){

	Quiz.remove({_id: req.body.idQuiz}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Cette quiz est supprimé",
				object: result
			});


	});

});

router.post('/findQuiz', function(req, res, next) {

	Quiz.findById(req.body.idQuiz, function(err, doc){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Cette quiz est:",
				object: doc
			});



	});
	
});

router.post('/modifierQuiz', function(req, res, next) {

	Quiz.findByIdAndUpdate(req.body.idQuiz, 
			   { 
			   	question: req.body.quiz.question, 
				image: req.body.quiz.image, 
				reponse1: req.body.quiz.reponse1, 
				reponse2: req.body.quiz.reponse2, 
				reponse3: req.body.quiz.reponse3,
				repCorrect: req.body.quiz.repCorrect, 
				idSerie: req.body.quiz.idSerie,    
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié un quiz",
					obj: result,
					repCorrect: req.body.quiz.repCorrect,
				});
			}

		);
	
});


module.exports = router;
