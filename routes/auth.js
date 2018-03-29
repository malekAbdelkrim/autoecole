var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passportOAuth = require('../config/passport');
var User = require('../models/user');

// on va mettre post puisqu'on va créer un utilisateur
router.post('/', function(req,res,next){

		var user = new User();
		    user.local.nom = req.body.nom;
		    user.local.prenom = req.body.prenom;
			user.local.email = req.body.email;
			user.local.motPasse = bcrypt.hashSync(req.body.motPasse,10);
			user.local.dateNaissance = "";
			user.local.image = "";
			user.local.CIN ="";

		user.save(function(err, result){
				if(err){
					return res.status(500).json({
						title: 'an error occurred',
						error: err
					});
				}
				var token1 = jwt.sign({result: result}, 'secret', {expiresIn: 7200});
				res.status(201).json({
					message: "user created",
					obj: result,
					token: token1
					
				});

		});
});


router.post('/signin', function(req,res,next){

	User.findOne({"local.email": req.body.email}, function(err,user){
			if(err){
				return res.status(500).json({
					title: 'an error occurred',
					error: err
				});
			}
			if(!user){
				return res.status(401).json({
					title: 'dont find the user',
					error: err
				});
			}
			if(!bcrypt.compareSync(req.body.motPasse, user.local.motPasse)){
				return res.status(401).json({
					title: 'dont find the user',
					error: {message: 'Invalid login credentials pwd'}

				});

			} 
			var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
			return res.status(200).json({
				title: 'this is our user:'+req.body.email,
				token: token,
				userId: user._id

			});

	});

});

//Les routes qui concerne facebook

router.get('/facebook',
  passportOAuth.authenticate('facebook', { scope : ['email']}));

router.get('/facebook/callback',
  passportOAuth.authenticate('facebook', { successRedirect: '/',
	                                          failureRedirect: '/'
	                                             }),
  function(req, res) {
  	console.log("malek");
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//les routes qui concerne google
router.get('/google',
  passportOAuth.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback',
  passportOAuth.authenticate('google', { successRedirect: '/',
	                                       failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports= router;