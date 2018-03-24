var express = require('express');
var router = express.Router();
var Pack = require('../models/pack');
var DetailPack = require('../models/detailPack');

/* GET home page. */
router.post('/ajouterPack', function(req, res, next){

	var pack = new Pack({

		 		titre: req.body.titre,
				description: req.body.description,
				nb_heure_code: req.body.nb_heure_code,
				nb_heure_conduit: req.body.nb_heure_conduit,
				prix: req.body.prix,
				type_pack: req.body.type_pack,
				remise: req.body.remise
	});

	pack.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "pack created",
					obj: result
				});
	});
});


router.post('/ajouterDetailsPack', function(req, res, next) {
		
			for (var i =0 ; i<req.body.details.length ; i++) {
				var detailPack = new DetailPack();
				detailPack.detail = req.body.details[i];
				detailPack.pack = req.body.idPack;
				detailPack.save(
						function(err,result){
								if(err){
									return res.status(500).json({
										title: 'an error occurred',
										error: err
									});
								}
								
					});
			}

			return res.status(200).json({
						title: 'details created' });
	

});

router.post('/getAllPack', function(req, res, next) {
		
		Pack.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "all pack",
				object: result
			});


	});
	
	

});

router.post('/getDetailsPack', function(req, res, next) {
		
		DetailPack.find({"pack": req.body.idPack}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "les détails de pack",
				object: result
			});


	});
	
	

});


router.post('/supprimerPack', function(req, res, next) {
		
		Pack.remove({_id: req.body.idPack}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce pack est supprimé",
				object: result
			});


	});
	

});

router.post('/getUnPack', function(req, res, next) {
		
		Pack.findById(req.body.idPack, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "un seul pack",
				object: result
			});


	});
	

});

router.post('/ajouterUnDetailPack', function(req, res, next) {
		
	
				var detailPack = new DetailPack();
				detailPack.detail = req.body.detail;
				detailPack.pack = req.body.idPack;
				detailPack.save(
						function(err,result){
								if(err){
									return res.status(500).json({
										title: 'an error occurred',
										error: err
									});
								}
									return res.status(200).json({
						                        title: 'details created',
						                        obj: result });
					});	
});

router.post('/supprimerDetailPack', function(req, res, next) {
		
	DetailPack.remove({_id: req.body.idDetail}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce detail est supprimé",
				object: result
			});


	});
	

});

router.post('/modifierDetailPack', function(req, res, next) {
		
	DetailPack.findByIdAndUpdate(req.body.idDetail, 
			   { 
			   		detail: req.body.detail
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié un detail",
					obj: result
				});
			}

		);
	

});

router.post('/modifierPack', function(req, res, next) {

	Pack.findByIdAndUpdate(req.body.idPack, 
			   { 
			   		titre: req.body.pack.titre,
					description: req.body.pack.description,
					nb_heure_code: req.body.pack.nb_heure_code,
					nb_heure_conduit: req.body.pack.nb_heure_conduit,
					prix: req.body.pack.prix,
					
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "cette promotion est modifier",
					obj: req.body
				});
			}

		);
});



module.exports = router;
