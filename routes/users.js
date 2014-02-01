module.exports = function(models){
	var fn = {};

	// GET /users/new
	fn.new = function(req, res) {
		res.render('users/new', { title: 'Log In' });
	};

	// POST /users/new
	fn.postNew = function(req, res) {
		var un = req.body.username;

		var lookupUser = function(err, result) {
			if (err) {
				res.send(500, { status : 'error' });
				console.log('Error finding user ' + un + '\n' + err);
			} else {
				if (result) {
					req.session.username = result.username;
					res.redirect('/');
				} else {
					var user = new models.User({
						username: un, // TODO: validation
						_tweets: []
					});
					user.save(saveUser);		
				}
			}
		};

		var saveUser = function(err){
			if (err) {
				res.send(500, { status : 'error' })
			} else {
				req.session.username = un;
				res.redirect('/');
			}
		};

		if (!req.session.username || un !== req.session.username) {
			models.User.findOne({ username: un }).exec(lookupUser);
		} else {
			// already logged in as this user
			res.redirect('/');
		}
	};

	return fn;
};