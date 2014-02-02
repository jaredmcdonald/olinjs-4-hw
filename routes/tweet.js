module.exports = function(models) {

	var postTweet = function(req, res) {
		var associationCallback = function(err) {
			if (err) {
				console.log('error associating tweet with user' + '\n' + err )
			} else {
				console.log('successfully pushed tweet to user' );
			}
		};

		var saveTweet = function(err, newTweet) {
			if (err) {
				res.send(500, { status: 'error' });
				console.log('Error saving tweet:\n' + err);
			} else {
				models.User.update({
					_id: newTweet._creator 
				}, { $push: { 
						_tweets : newTweet._id
					}
				}).exec(associationCallback);

				// hack: set username from session
				if (!newTweet._creator.username) newTweet._creator.username = req.session.username;

				res.render('include/_tweet-list', {
					tweets: [ newTweet ]
				});
			}
		};

		if (req.session.userId && req.body.content) {
			var now = new Date(),
				tweet = new models.Tweet({
					content: req.body.content,
					timestamp: now.getTime(),
					formattedDate: now.toDateString(),
					formattedTime: now.toTimeString(),
					_creator: req.session.userId
				}).save(saveTweet);
		} else {
			res.send(500, { status: 'error' });
		}
	};

	return postTweet;
};