module.exports = function(models){
	var fn = {};

	fn.index = function(req, res) {
		res.render('list', {
			title: 'All Tweets',
			username: req.session.username || null,
			userId: req.session.userId || null
		});
	};

	return fn;
};