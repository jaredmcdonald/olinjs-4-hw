var Twit = (function(){

	var tweetsHTML,
		$errorMsg = $('#errorMsg');

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
			.error(tweetErrorPost)
		 	.success(tweetSuccess);
	};

	var tweetErrorPost = function(err) {
		$errorMsg.text('wow error uh oh problem posting tweet ;(').removeClass('hide');
	};

	var tweetSuccess = function(data) {
		$('#tweetContent').val('');
		$('#tweetContainer > ul').prepend(data);
		$errorMsg.empty().addClass('hide');
	};

	var pollTweets = function(){
		var intervalHandle = setInterval(getTweets, 2000);
	};

	var getTweets = function(){
		$.get('/tweets')
			.error(tweetErrorGet)
			.success(tweetUpdater);
	};

	var tweetErrorGet = function(err) {
		$('#errorMsg').text('such error uh oh problem getting new tweetz ;(').removeClass('hide');
	};

	var tweetUpdater = function(html) {
		if ($(html).filter('li').length !== $('#tweetContainer ul li').length) {
			tweetsHTML = html;
			$('#showNewTweets').removeClass('hide');
		}
		$errorMsg.empty().addClass('hide');
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