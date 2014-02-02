module.exports = function(models){
	var fn = {};

	fn.index = function(req, res) {
		var renderTweets = function(err, tweets) {
			if (err) {
				res.send(500, { status: 'error' });
				console.log(err);
			} else {
				res.render('list', {
					title: 'Tweeter',
					username: req.session.username || null,
					userId: req.session.userId || null,
					tweets: tweets
				});							
			}
		};

		models.Tweet.find()
			.sort('-timestamp')
			.populate('_creator')
			.exec(renderTweets);

	};

	return fn;
};