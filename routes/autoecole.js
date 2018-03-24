var express = require("express");
var router = express.Router();
var AutoEcole = require('../models/autoecole');
var HoraireAuto = require('../models/horaireauto');
var Professeur = require('../models/professeur');
var nodemailer = require('nodemailer');
//var Nexmo = require('nexmo');
var client = require('twilio')(
 "ACfbcd34b8b386d93b19948182022d665a",
 "8fb3ad55342ebc481b2d2ad9a909a71d"
);
 

router.post('/', function(req, res, next){

	AutoEcole.find({}, function(err, result){
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

router.post('/ajouter', function(req, res, next){

	var auto = new AutoEcole({
		code: req.body.code,
		email: req.body.email,
		nom: req.body.nom,
		description: req.body.description,
		facebook: req.body.facebook,
		twitter: req.body.twitter,
		instagram: req.body.instagram,
		map: req.body.map,
	    nomProprietaire: req.body.nomProprietaire,
		adresse: req.body.adresse,
		telephone: req.body.telephone,
		logo: req.body.logo,
		prix_heure_code: req.body.prix_heure_code,
		prix_heure_conduit: req.body.prix_heure_conduit
		

	});
	//console.log(auto);
	auto.save(function(err,result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "auto created",
					obj: result
				});
	});

	
});

router.post('/modifier', function(req, res, next){

	
	AutoEcole.findByIdAndUpdate(req.body.id, 
			   { code: req.body.auto.code,
				email: req.body.auto.email,
				nom: req.body.auto.nom,
				description: req.body.auto.description,
				facebook: req.body.auto.facebook,
				twitter: req.body.auto.twitter,
				instagram: req.body.auto.instagram,
				map: req.body.auto.map,
			    nomProprietaire: req.body.auto.nomProprietaire,
				adresse: req.body.auto.adresse,
				telephone: req.body.auto.telephone,
				logo: req.body.auto.logo,
				prix_heure_code: req.body.auto.prix_heure_code,
				prix_heure_conduit: req.body.auto.prix_heure_conduit
			},
			function(err, result){
				if(err){
				    return res.status(500).json({
					message: "aucune modification",
					error: err
					});
				}
				res.status(200).json({
					message: "auto ecole modifier",
					obj: result
				});
			}

		);

});

router.post('/ajouterHoraire', function(req, res, next){
	var horaire = new HoraireAuto({
		jour: req.body.horaire.jour,
		heure_ouv_matin: req.body.horaire.heure_ouv_matin,
		heure_ferm_matin: req.body.horaire.heure_ferm_matin,
		heure_ouv_soir: req.body.horaire.heure_ouv_soir,
		heure_ferm_soir: req.body.horaire.heure_ferm_soir,
		autoEcole: req.body.id
	});

	horaire.save(function(err,result){

			if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				
				res.status(201).json({
					message: "horaire créer",
					obj: result
				});

	});
});

router.post('/infoHoraire', function(req, res, next){
	HoraireAuto.find({}, function(err, result){
			if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "les horaires sont réglé",
				object: result
			});


	});

});

router.post('/modifierHoraire', function(req, res, next){
	HoraireAuto.findOneAndUpdate({jour: req.body.jour}, {

														heure_ouv_matin: req.body.heure_ouv_matin,
														heure_ferm_matin: req.body.heure_ferm_matin,
													    heure_ouv_soir: req.body.heure_ouv_soir,
														heure_ferm_soir: req.body.heure_ferm_soir},

														{new: true},
								function(err,result){
									if(err){
										return res.status(501).json({
													title: 'an error occurred',
													error: err
												});
									}
									return res.status(201).json({
																title: "les horaires sont modifié",
																object: result
															});

								}

		);
});

router.post('/ajouterProf', function(req, res, next){
	var prof = new Professeur({
		nom: req.body.prof.nom,
		prenom: req.body.prof.prenom,
		CIN: req.body.prof.CIN,
		img: req.body.prof.img,
		type_cours: req.body.prof.type_cours,
		description: req.body.prof.description,
		date_depart: req.body.prof.date_depart,
		adresse: req.body.prof.adresse,
		telephone: req.body.prof.telephone,
		email: req.body.prof.email,
		autoEcole: req.body.id
	});

	prof.save(function(err,result){
			if(err){
				return res.status(501).json({title: 'an error occurred',
											error: err });
			}

			return res.status(201).json({ title: "un nouveau professeur",
										  object: result });

	});

});

router.post('/getProf', function(req, res, next){
	Professeur.find({}, function(err, result){
		if(err){
				return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
			}
			return res.status(201).json({
				title: "les professeurs sont",
				object: result
			});

	});

});

router.post('/removeProf', function(req, res, next){
	Professeur.remove({_id: req.body.idProf}, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce professeur est supprimé",
				object: result
			});


	});
});

router.post('/getProfById', function(req, res, next){
	Professeur.findById(req.body.idProf, function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce professeur est",
				object: result
			});


	});
});


router.post('/modifierProf', function(req, res, next){
	Professeur.findByIdAndUpdate(req.body.idProf,  
			{ 
				nom: req.body.prof.nom,
				prenom: req.body.prof.prenom,
				CIN: req.body.prof.CIN,
				img: req.body.prof.img,
				type_cours: req.body.prof.type_cours,
				description: req.body.prof.description,
				date_depart: req.body.prof.date_depart,
				adresse: req.body.prof.adresse,
				telephone: req.body.prof.telephone,
				email: req.body.prof.email
				
			},
		function(err, result){
		if(err){
			return res.status(501).json({
					title: 'an error occurred',
					error: err
				});
		}

		return res.status(201).json({
				title: "Ce professeur est",
				object: result
			});
	});
});

router.post('/envoyerEmail', function(req, res, next){
	var transporter = nodemailer.createTransport({
  	service: 'gmail',
    auth: {
      user: 'ben.abdelkrim.malek@gmail.com',  //req.body
      pass: '44773366rdok'  //req.body
    }
});
  
  var mailOptions = {
  from: 'ben.abdelkrim.malek@gmail.com',
  to: 'ben.abdelkrim.malek@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    return res.status(501).json({
					title: 'an error occurred',
					error: error
				});
  } else {
    console.log('Email sent: ' + info.response);
    return res.status(201).json({
				title: "Email envoyer",
				object: info
			});
  }
});

});

router.post('/sendSms', function(req, res, next){

client.messages.create(
  {
    to: '+21654696633',
    from: '+18582957756',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs  kkkkk?',
  },
  function(err, message){
  	if(err){
  		console.log(err);
  		 return res.status(500).json({
				title: "SMS error",
				object:err
			});

  	}
  		console.log(message);
  		/*return res.status(201).json({
				title: "SMS envoyer",
				object: message
			});*/
  	
  
  }
);


	//Nexmo
	/*const nexmo = new Nexmo({
        apiKey: "5484f34e",
        apiSecret: "a334a5994f104b28"
    }, {debug: true});
	
	const toNumber = "21654696633";
    const text = "test1";

    nexmo.message.sendSms(
    "21654696633", toNumber, text, {type: 'unicode'}, 
    function(err,responseData){
      if (err) {
       return res.status(500).json({
				title: "SMS error",
				object:err
			});
      } else {
       return res.status(201).json({
				title: "SMS envoyer",
				object: responseData
			});
        // Optional: add socket.io -- will explain later
      }
    }
  );*/


});




module.exports= router;
