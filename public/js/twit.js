var Twit = (function(){

	var watchTweetForm = function() {
		$('#createTweet').on('submit', postTweet);
	};

	var postTweet = function(e) {
		e.preventDefault();
		var $this = $(this);
		$.post($this.attr('action'), {
			content: $this.children('textarea').val(),
			userId: $this.attr('data-userid')
		})
			.error(tweetError)
		 	.success(tweetSuccess);
	};

	var tweetError = function(err) {
		alert('Such Error ;(');
	};

	var tweetSuccess = function(data) {
		$('#tweetContent').val('');
		$('#tweetContainer > ul').prepend(data);
	};

	return {
		init: function() {
			watchTweetForm();
		}
	}
})();

$(document).ready(function documentReady() {
	Twit.init();
});