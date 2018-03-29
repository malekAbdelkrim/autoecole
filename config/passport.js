var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User       = require('../models/user');
var configAuth = require('./auth');


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		 clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
	    profileFields: ['emails', 'id', 'displayName', 'photos']
	},
		 function(accessToken, refreshToken, profile, done) {
		 	process.nextTick(function(){
		 		User.findOne({'facebook.id': profile.id}, function(err, user){
		 			if(err){
		 				console.log('this is error'+ err)
	    				return done(err);
		 			}
	    			if(user)
	    				return done(null, user);
	    			else {
	    				//console.log(profile);
	    				
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.nom = profile.displayName;
	    				newUser.facebook.image = profile.photos[0].value;
	    				newUser.facebook.email = '';
	    				console.log(newUser);
	    				
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				});
	    				//console.log(profile);
	    			}
		 		});
		 	});
		 }
	));

	passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done){
		process.nextTick(function(){
			User.findOne({'google.id': profile.id}, function(err, user){
		 			if(err){
		 				console.log('this is error'+ err)
	    				return done(err);
		 			}
	    			if(user)
	    				return done(null, user);
	    			else {
	    				console.log(profile);

	    				
	    				var newUser = new User();
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.nom = profile.displayName;
	    				newUser.google.image = profile.photos[0].value;
	    				newUser.google.email = profile.emails[0].value; 
	    				console.log(newUser);
	    				
	    				newUser.save(function(err){
	    					if(err){
	    						console.log(err);
	    						throw err;
	    					}
	    					return done(null, newUser);
	    				});
	    				//console.log(profile);
	    			}
		 		});

		});
	}


		));
module.exports = passport;


