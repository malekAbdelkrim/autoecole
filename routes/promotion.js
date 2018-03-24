var express = require('express');
var router = express.Router();
var Promotion = require('../models/promotion');
var DetailPromo = require('../models/detailPromo');
var PromotionArgentReduction = require('../models/promotionArgentReduction');
var PromotionNbPersonneReduction = require('../models/promotionNbPersonneReduction');


/* GET home page. */
router.post('/getPromo', function(req, res, next) {

	Promotion.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir autoecole",
				object: result
			});


	});

  
});


router.post('/nvPack', function(req, res, next) {

	var promotion = new Promotion();
	promotion.nouveau_pack.date_depart = req.body.date_depart;
	promotion.nouveau_pack.date_expiration = req.body.date_expiration;
	promotion.nouveau_pack.image = req.body.image;
	promotion.nouveau_pack.titre = req.body.titre;
	promotion.nouveau_pack.description = req.body.description;
	promotion.nouveau_pack.nb_heure_code = req.body.nb_heure_code;
	promotion.nouveau_pack.nb_heure_conduit = req.body.nb_heure_conduit;
	promotion.nouveau_pack.prix_total = req.body.prix_total;
	promotion.nouveau_pack.valable = false;
	promotion.nouveau_pack.historique = false;

	promotion.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "promotion created",
					obj: result
				});
	});
});

router.post('/ajouterPromoPack', function(req, res, next) {

	var promotion = new Promotion();
	promotion.pack.date_depart = req.body.date_depart;
	promotion.pack.date_expiration = req.body.date_expiration;
	promotion.pack.image = req.body.image;
	promotion.pack.titre = req.body.titre;
	promotion.pack.description = req.body.description;
	promotion.pack.promoPackCode = req.body.promoPackCode;
	promotion.pack.promoPackConduit = req.body.promoPackConduit;
	promotion.pack.promoPackCodeConduit = req.body.promoPackCodeConduit;
	promotion.pack.valable = false;
	promotion.pack.historique = false;

	promotion.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "promotion created",
					obj: result
				});
	});
});



router.post('/removePromo', function(req, res, next) {

	Promotion.remove({_id: req.body.idPromo}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Cette promotion est supprimé",
				object: result
			});


	});
	
});


router.post('/findById', function(req, res, next) {

	Promotion.findById(req.body.idPromo, function(err, doc){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Cette promotion est:",
				object: doc
			});



	});
	
});

router.post('/modifiernvPack', function(req, res, next) {

	Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 

			   	"nouveau_pack.date_depart": req.body.pack.date_depart,
				"nouveau_pack.date_expiration": req.body.pack.date_expiration,
				"nouveau_pack.image": req.body.pack.image,
				"nouveau_pack.titre": req.body.pack.titre,
				"nouveau_pack.description": req.body.pack.description,
				"nouveau_pack.nb_heure_code": req.body.pack.nb_heure_code,
				"nouveau_pack.nb_heure_conduit": req.body.pack.nb_heure_conduit,
				"nouveau_pack.prix_total": req.body.pack.prix_total,
				"nouveau_pack.valable": false,
				"nouveau_pack.historique": false
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

router.post('/modifierPromoPack', function(req, res, next) {

	Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 

			   	"pack.date_depart": req.body.remisePack.date_depart,
				"pack.date_expiration": req.body.remisePack.date_expiration,
				"pack.image": req.body.remisePack.image,
				"pack.titre": req.body.remisePack.titre,
				"pack.description": req.body.remisePack.description,
				"pack.promoPackCode": req.body.remisePack.promoPackCode,
				"pack.promoPackConduit": req.body.remisePack.promoPackConduit,
				"pack.promoPackCodeConduit": req.body.remisePack.promoPackCodeConduit,
				"pack.valable": false,
				"pack.historique": false
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

router.post('/ajouterPHCC', function(req, res, next) {

	var promo = new Promotion();
	promo.prix_code_conduit.date_depart = req.body.date_depart;
	promo.prix_code_conduit.date_expiration = req.body.date_expiration;
	promo.prix_code_conduit.image = req.body.image;
	promo.prix_code_conduit.titre = req.body.titre;
	promo.prix_code_conduit.description = req.body.description;
	promo.prix_code_conduit.prix_code = req.body.prix_heure_code;
	promo.prix_code_conduit.prix_conduit = req.body.prix_heure_conduit;
	promo.prix_code_conduit.valable = false;
	promo.prix_code_conduit.historique = false;

	promo.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "promotion created",
					obj: result
				});
	});

});

router.post('/modifierPHCC', function(req, res, next) {

	Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 

			   	"prix_code_conduit.date_depart": req.body.pack.date_depart,
				"prix_code_conduit.date_expiration": req.body.pack.date_expiration,
				"prix_code_conduit.image": req.body.pack.image,
				"prix_code_conduit.titre": req.body.pack.titre,
				"prix_code_conduit.description": req.body.pack.description,
				"prix_code_conduit.prix_code": req.body.pack.prix_heure_code,
				"prix_code_conduit.prix_conduit": req.body.pack.prix_heure_conduit,
				"prix_code_conduit.valable" :false,
				"prix_code_conduit.historique" :false
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

router.post('/ajouterArgentReduction', function(req, res, next) {

	var promo = new Promotion();
	promo.totaliteArgent.date_depart = req.body.date_depart;
	promo.totaliteArgent.date_expiration = req.body.date_expiration;
	promo.totaliteArgent.image = req.body.image;
	promo.totaliteArgent.titre = req.body.titre;
	promo.totaliteArgent.description = req.body.description;
	promo.totaliteArgent.valable = false;
	promo.totaliteArgent.historique = false;
	
	promo.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "promotion created",
					obj: result
				});
	});

});

router.post('/ajouterDetailsArgentReduction', function(req, res, next) {
			for (var i =0 ; i<req.body.argentPourcentage.length ; i++) {
				var argentReduction = new PromotionArgentReduction();
				argentReduction.prix1 = req.body.argentPourcentage[i].prix1;
				argentReduction.prix2 = req.body.argentPourcentage[i].prix2;
				argentReduction.reduction = req.body.argentPourcentage[i].reduction;
				argentReduction.promo = req.body.idPromo;

				argentReduction.save(
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
						title: 'promotion created' });
	
});

router.post('/getDetailsArgentReduction', function(req, res, next) {
		PromotionArgentReduction.find({"promo": req.body.idPromo}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir autoecole",
				object: result
			});


	});
			
});


router.post('/modifierDetailsArgentReduction', function(req, res, next) {
		


	PromotionArgentReduction.findByIdAndUpdate(req.body.idDetail, 
			   { 
			   	prix1: req.body.argentPourcentage.prix1,
				prix2: req.body.argentPourcentage.prix2,
				reduction: req.body.argentPourcentage.reduction
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification effectué",
					obj: result
				});
			}

		);
			
});

router.post('/supprimerDetailsArgentReduction', function(req, res, next) {
		
	PromotionArgentReduction.remove({_id: req.body.idDetail}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce détail est supprimé",
				object: result
			});


	});
	
});

router.post('/modifierArgentReduction', function(req, res, next) {
		
	Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
			   	"totaliteArgent.date_depart": req.body.promo.date_depart,
				"totaliteArgent.date_expiration": req.body.promo.date_expiration,
				"totaliteArgent.image": req.body.promo.image,
				"totaliteArgent.titre": req.body.promo.titre,
				"totaliteArgent.description": req.body.promo.description,
				"totaliteArgent.valable": false,
				"totaliteArgent.historique": false
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification effectué",
					obj: result
				});
			}

		);
	
});

router.post('/ajouterDetailsPromotion', function(req, res, next) {
		
			for (var i =0 ; i<req.body.details.length ; i++) {
				var detailPromo = new DetailPromo();
				detailPromo.detail = req.body.details[i];
				detailPromo.promo = req.body.idPromo;
				detailPromo.save(
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

router.post('/getDetailsPromo', function(req, res, next) {
		
			DetailPromo.find({"promo": req.body.idPromo}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir les détails de promotion",
				object: result
			});


	});
	

});

router.post('/supprimerDetailPromo', function(req, res, next) {
		
	DetailPromo.remove({_id: req.body.idDetail}, function(err, result){
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

router.post('/modifierDetailPromo', function(req, res, next) {
		
	DetailPromo.findByIdAndUpdate(req.body.idDetail, 
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

router.post('/ajouterUnDetailPromo', function(req, res, next) {
		
	
				var detailPromo = new DetailPromo();
				detailPromo.detail = req.body.detail;
				detailPromo.promo = req.body.idPromo;
				detailPromo.save(
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

router.post('/ajouterPersonneReduction', function(req, res, next) {
	var promo = new Promotion();
	promo.nombrePersonne.date_depart = req.body.date_depart;
	promo.nombrePersonne.date_expiration = req.body.date_expiration;
	promo.nombrePersonne.image = req.body.image;
	promo.nombrePersonne.titre = req.body.titre;
	promo.nombrePersonne.description = req.body.description;
	promo.nombrePersonne.valable = false;
	promo.nombrePersonne.historique = false;
	
	promo.save(
		function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "promotion created",
					obj: result
				});
	});	
	
				
});

router.post('/ajouterDetailsPersonneReduction', function(req, res, next) {
	for (var i =0 ; i<req.body.personneReduction.length ; i++) {
				var personneReduction = new PromotionNbPersonneReduction();
				personneReduction.nbPersonne1 = req.body.personneReduction[i].personne1;
				personneReduction.nbPersonne2 = req.body.personneReduction[i].personne2;
				personneReduction.reduction = req.body.personneReduction[i].reduction;
				personneReduction.promo = req.body.idPromo;

				personneReduction.save(
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
						title: 'Details Personne Reduction created' });
				
});


router.post('/getDetailsPersonneReduction', function(req, res, next) {
	PromotionNbPersonneReduction.find({"promo": req.body.idPromo}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "avoir tous détails promotions personne",
				object: result
			});


	});
	
				
});

router.post('/modifierDetailsPersonneReduction', function(req, res, next) {
	PromotionNbPersonneReduction.findByIdAndUpdate(req.body.idDetail, 
			   { 
			   	nbPersonne1: req.body.personneReduction.personne1,
				nbPersonne2: req.body.personneReduction.personne2,
				reduction: req.body.personneReduction.reduction
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification effectué",
					obj: result
				});
			}

		);
	
				
});

router.post('/supprimerDetailsPersonneReduction', function(req, res, next) {

	PromotionNbPersonneReduction.remove({_id: req.body.idDetail}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce détail est supprimé",
				object: result
			});


	});
	
				
});

router.post('/modifierPersonneReduction', function(req, res, next) {
	
     Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
			   	"nombrePersonne.date_depart": req.body.promo.date_depart,
				"nombrePersonne.date_expiration": req.body.promo.date_expiration,
				"nombrePersonne.image": req.body.promo.image,
				"nombrePersonne.titre": req.body.promo.titre,
				"nombrePersonne.description": req.body.promo.description,
				"nombrePersonne.valable": false,
				"nombrePersonne.historique": false

			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification effectué",
					obj: result
				});
			}

		);
	
	
				
});

router.post('/modifierValablePromo', function(req, res, next) {
	
	if(req.body.typePack === "pack"){
			 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"pack.valable": req.body.valable
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de validité est effectué",
					obj: result
				});
			}

		);

	}

	if(req.body.typePack === "nouveau_pack"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"nouveau_pack.valable": req.body.valable
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de validité est effectué",
					obj: result
				});
			}

		);
	}

	if(req.body.typePack === "totaliteArgent"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"totaliteArgent.valable": req.body.valable
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de validité est effectué",
					obj: result
				});
			}

		);
	}

	if(req.body.typePack === "prix_code_conduit"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"prix_code_conduit.valable": req.body.valable
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de validité est effectué",
					obj: result
				});
			}

		);
	}

	if(req.body.typePack === "nombrePersonne"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"nombrePersonne.valable": req.body.valable
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de validité est effectué",
					obj: result
				});
			}

		);
	}


    
	
	
				
});

router.post('/modifierHistoriquePromo', function(req, res, next) {
	
	if(req.body.typePack === "pack"){
			 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"pack.historique": true
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de historique est effectué",
					obj: result
				});
			}

		);

	}

	if(req.body.typePack === "nouveau_pack"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"nouveau_pack.historique": true
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de historique est effectué",
					obj: result
				});
			}

		);
	}
	
	if(req.body.typePack === "totaliteArgent"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"totaliteArgent.historique": true
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de historique est effectué",
					obj: result
				});
			}

		);
	}

	if(req.body.typePack === "prix_code_conduit"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"prix_code_conduit.historique": true
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de historique est effectué",
					obj: result
				});
			}

		);
	}

	if(req.body.typePack === "nombrePersonne"){

		 Promotion.findByIdAndUpdate(req.body.idPromo, 
			   { 
				"nombrePersonne.historique": true
				},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "modification de historique est effectué",
					obj: result
				});
			}

		);
	}


    
	
	
				
});



module.exports = router;
