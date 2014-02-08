var Twit = (function(){

	var tweetsHTML;

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

	var pollTweets = function(){
		var intervalHandle = setInterval(getTweets, 2000);
	};

	var getTweets = function(){
		$.get('/tweets')
			.error(tweetError)
			.success(tweetUpdater);
	};

	var tweetUpdater = function(html) {
		if ($(html).filter('li').length !== $('#tweetContainer ul li').length) {
			tweetsHTML = html;
			$('#showNewTweets').removeClass('hide');
		}
	};

	var showNewTweetsHandler = function() {
		$('#showNewTweets').on('click', function showNewTweets(e){
			$('#tweetContainer ul').html(tweetsHTML);
			$(this).addClass('hide');
		});
	};

	return {
		init: function() {
			watchTweetForm();
			pollTweets();
			showNewTweetsHandler();
		}
	}
})();

$(document).ready(function documentReady() {
	Twit.init();
});