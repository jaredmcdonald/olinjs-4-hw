module.exports = function(mongoose) {
	var fn = {};

	// models.User
	var userSchema = mongoose.Schema({
	    username: String,
	    _tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }]
	});
	fn.User = mongoose.model('User', userSchema);

	// models.Tweet
	var tweetSchema = mongoose.Schema({
		timestamp: Number,
		content: String,
		_creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	});
	fn.Tweet = mongoose.model('Tweet', tweetSchema);

	return fn;
};