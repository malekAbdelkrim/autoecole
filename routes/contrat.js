var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Pack = require('../models/pack');
var Promotion = require('../models/promotion');
var AutoEcole = require('../models/autoecole');
var Contrat = require('../models/contrat');
var Paiement = require('../models/paiement');
var ListPackContrat = require('../models/listPackContrat');
var PromotionArgentReduction = require('../models/promotionArgentReduction');
var PromotionNbPersonneReduction = require('../models/promotionNbPersonneReduction');



/* GET home page. */

router.post('/findAllUser', function(req, res, next){

	User.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir tous les utilisateur",
				object: result
			});


	});

});


router.post('/getAllPack', function(req, res, next){

	Pack.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir tous les Pack",
				object: result
			});


	});

});

router.post('/getInfoAutoEcole', function(req, res, next){

	AutoEcole.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir info de auto-ecole",
				object: result
			});


	});

});


router.post('/getPromo', function(req, res, next){

	Promotion.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir info promotion",
				object: result
			});


	});

});

router.post('/getPromoArgentReduction', function(req, res, next){

	PromotionArgentReduction.find({"promo":req.body.idPromo}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir info promotion argent reduction",
				object: result
			});


	});

});

router.post('/getPromoPersonneReduction', function(req, res, next){

	PromotionNbPersonneReduction.find({"promo":req.body.idPromo}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir info promotion argent reduction",
				object: result
			});


	});

});
router.post('/ajouterContrat', function(req, res, next){

	   
	var contrat = new Contrat({
			nomUtilisateur: req.body.nomComplet,
			CIN: req.body.CIN,
			telephone: req.body.telephone,
			email: req.body.email,
			date_inscription: req.body.dateInscription,
	        idUser: req.body.id_user,

			nbHeureConduitSupp: req.body.nbHeureConduitSupp,
			nbHeureCodeSupp: req.body.nbHeureCodeSupp,

			nbHeureCodeTotal: req.body.nbHeureCodeTotal,
			nbHeureConduitTotal: req.body.nbHeureConduitTotal,

			totalPrix: req.body.prixTotal,
	        totalPrixApresPromo: req.body.prixTotalApresPromo,

	        idPromo: req.body.idPromo
		});
	/*return res.status(200).json({
						title: 'un nouveau contrat',
						object: contrat
					});*/
     contrat.save(function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "contrat created",
					obj: result
				});
	});
});


router.post('/ajouterListPackContrat', function(req, res, next){
		
		var unPack = new ListPackContrat({
				idPack: req.body.idPack,
			    idContrat: req.body.idContrat

		});

			
			 unPack.save(function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "la liste de contrat est crée",
					obj: result
				});
	});

});

router.post('/getAllContrat', function(req, res, next){

	Contrat.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir tous les contrats",
				object: result
			});


	});

});

router.post('/updateDateExamenCode', function(req, res, next) {
		
	Contrat.findByIdAndUpdate(req.body.idContrat, 
			   { 
			   		dateExamenCode: req.body.dtCode
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié date examen code",
					obj: result
				});
			}

		);
	

});


router.post('/updateDateExamenConduit', function(req, res, next) {
		
	Contrat.findByIdAndUpdate(req.body.idContrat, 
			   { 
			   		dateExamenConduit: req.body.dtConduit
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié date examen conduit",
					obj: result
				});
			}

		);
	

});


router.post('/updateReussiCode', function(req, res, next) {
		
	Contrat.findByIdAndUpdate(req.body.idContrat, 
			   { 
			   		reussiteExamenCode: req.body.reussi
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié réussi code",
					obj: result
				});
			}

		);
	

});


router.post('/updateReussiConduit', function(req, res, next) {
		
	Contrat.findByIdAndUpdate(req.body.idContrat, 
			   { 
			   		reussiteExamenConduit: req.body.reussi
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié réussi conduit",
					obj: result
				});
			}

		);
	

});

router.post('/supprimerContrat', function(req, res, next) {

	Contrat.remove({_id: req.body.idContrat}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce contrat est supprimé",
				object: result
			});


	});
	
});

router.post('/getInfoContrat', function(req, res, next) {
		
		Contrat.findById(req.body.idContrat, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "ce contrat",
				object: result
			});


	});
	

});

router.post('/getPromoById', function(req, res, next) {
		
		Promotion.findById(req.body.idPromo, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "une seule promotion",
				object: result
			});


	});
	

});

router.post('/getPackContrat', function(req, res, next){

	ListPackContrat.find({'idContrat': req.body.idContrat}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir la liste de pack de contrat",
				object: result
			});


	});

});


router.post('/supprimerTousListPackContrat', function(req, res, next){

	ListPackContrat.remove({'idContrat': req.body.idContrat}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "la liste de pack est supprimé",
				object: result
			});


	});
});

router.post('/updateContrat', function(req, res, next) {
		
	Contrat.findByIdAndUpdate(req.body.idContrat, 
			   { 
			   		nomUtilisateur: req.body.contrat.nomComplet,
					CIN: req.body.contrat.CIN,
					telephone: req.body.contrat.telephone,
					email: req.body.contrat.email,
					date_inscription: req.body.contrat.dateInscription,
			        idUser: req.body.contrat.id_user,

					nbHeureConduitSupp: req.body.contrat.nbHeureConduitSupp,
					nbHeureCodeSupp: req.body.contrat.nbHeureCodeSupp,

					nbHeureCodeTotal: req.body.contrat.nbHeureCodeTotal,
					nbHeureConduitTotal: req.body.contrat.nbHeureConduitTotal,

					totalPrix: req.body.contrat.prixTotal,
			        totalPrixApresPromo: req.body.contrat.prixTotalApresPromo,

			        idPromo: req.body.contrat.idPromo
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "on a modifié le contrat",
					obj: result
				});
			}

		);
	

});

router.post('/getInfoPack', function(req, res, next) {
		
		Pack.findById(req.body.idPack, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "ce contrat",
				object: result
			});


	});
	

});

router.post('/getAllPaiement', function(req, res, next){

	Paiement.find({'idContrat': req.body.idContrat}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir paiement",
				object: result
			});


	});

});

router.post('/ajouterTranche', function(req, res, next){

	var paie = new Paiement({
			tranche: req.body.tranche,
			datePaiement: req.body.datePaiement,
			idContrat: req.body.idContrat
	});


	paie.save(function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "paie created",
					obj: result
				});
		});

	});

router.post('/supprimerTranche', function(req, res, next) {

	Paiement.remove({'idContrat': req.body.idContrat}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce paiement est supprimé",
				object: result
			});


	});
	
});

module.exports = router;
