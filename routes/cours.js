var express = require("express");
var router = express.Router();
var Cours = require('../models/cours');
var multer = require('multer');
var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, './public/cours/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload_cours = multer({ storage: storage });



router.post("/upload_cours", upload_cours.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});

router.post('/ajouterNvCours', function(req, res, next){
		var cours = new Cours({
			titre: req.body.titre,
			description: req.body.description,
			contenu: req.body.contenu,
			dateMiseJour: req.body.dateMiseJour
		});

	cours.save(function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "cours created",
					obj: result
				});
			});	
  });


router.post('/findAllCours', function(req, res, next){

	Cours.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir tous les cours",
				object: result
			});


	});

});

router.post('/removeCours', function(req, res, next) {

	Cours.remove({_id: req.body.idCours}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce cours est supprimé",
				object: result
			});


	});
	
});

router.post('/findCoursById', function(req, res, next) {

		Cours.findById(req.body.idCours, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce cours est",
				object: result
			});


	});

	
	
});

router.post('/updateCours', function(req, res, next) {

		Cours.findByIdAndUpdate(req.body.idCours, 
			   { 
			   		titre: req.body.cours.titre,
					description: req.body.cours.description,
					contenu:req.body.cours.contenu,
					dateMiseJour: req.body.cours.dateMiseJour
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié un cours",
					obj: result
				});
			}

		);
	

});

module.exports = router;
