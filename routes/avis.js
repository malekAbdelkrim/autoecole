var express = require('express');
var router = express.Router();
var Avis = require('../models/avis');

/* GET home page. */
router.post('/ajouterAvis', function(req, res, next){

	var avis = new Avis({
		commentaire: req.body.commentaire,
		nbVoiture: req.body.nbVoiture,
		dateCommentaire: req.body.dateCommentaire,
		idUser: req.body.idUser
	});

	avis.save(function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "avis created",
					obj: result
				});
	});


});

router.post('/findAllAvis', function(req, res, next){

	Avis.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir tous les avis",
				object: result
			});


	});

});

router.post('/supprimerAvis', function(req, res, next){
	Avis.remove({_id: req.body.idAvis}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce avis est supprimé",
				object: result
			});


	});
});
router.post('/modifierAvis', function(req, res, next){
	Avis.findByIdAndUpdate(req.body.idAvis,  
			{ 
				commentaire: req.body.avis.commentaire,
				nbVoiture: req.body.avis.nbVoiture,
				dateCommentaire: req.body.avis.dateCommentaire
			},
		function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce avis est modifié",
				object: result
			});
	});
});


router.post('/findAvisByIdUser', function(req, res, next){

	Avis.find({'idUser': req.body.idUser}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir le avis de ce utilisateur",
				object: result
			});


	});

});


module.exports = router;
