module.exports = function(models){
	var fn = {};

	fn.index = function(req, res) {
		console.log(req.session);
		res.render('list', { title: 'All Tweets', username: req.session.username || 'Not Logged In' });
	};

	return fn;
};