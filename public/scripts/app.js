/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let tweetsDisplayed = 0;

function getDaysSince(referenceDateObject) {
  let today = new Date();
  let diff = new Date(today - referenceDateObject);
  let days = diff / 1000 / 60 / 60 / 24;
  return parseInt(days);
}

function createTweetElement(tweetData) {
  let dateCreated = new Date(tweetData.created_at);
  let days = getDaysSince(dateCreated);
  
  $(`.new-tweet`).after(`<article class="tweet ${tweetsDisplayed}">`);
  $(`article.tweet.${tweetsDisplayed}`).append('<header>');
  $(`article.tweet.${tweetsDisplayed} header`).append(`<img src="${tweetData.user.avatars.small}" alt="user avatar" width="50px" height="50px">`);
  $(`article.tweet.${tweetsDisplayed} header`).append('<h2>')
  $(`article.tweet.${tweetsDisplayed} header h2`).text(tweetData.user.name);
  $(`article.tweet.${tweetsDisplayed} header`).append('<h6>')
  $(`article.tweet.${tweetsDisplayed} header h6`).text(tweetData.user.handle);
  $(`article.tweet.${tweetsDisplayed} header`).after('<p>')
  $(`article.tweet.${tweetsDisplayed} p`).text(tweetData.content.text);
  $(`article.tweet.${tweetsDisplayed} p`).after('<footer>');
  $(`article.tweet.${tweetsDisplayed} footer`).append(`<p>${days}</p>`)
  $(`article.tweet.${tweetsDisplayed} footer`).append('<i class="fas fa-heart">');
  $(`article.tweet.${tweetsDisplayed} footer`).append('<i class="fas fa-retweet">');
  $(`article.tweet.${tweetsDisplayed} footer`).append('<i class="fas fa-flag">');
  tweetsDisplayed += 1;
}

function renderTweets(tweetData) {
  for (let i = 0; i < tweetData.length; i++) {
    createTweetElement(tweetData[i]);
  }
}

function loadTweets() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: function (response) {
      renderTweets(response);
    }
  });
}


$(document).ready(function () {

  loadTweets();

  $("form").on("submit", function (event) {
    event.preventDefault();
    let $tweetText = $(this).serialize();
    let userEnteredText = $("form textarea").val();
    if (userEnteredText) {
      if (userEnteredText.length <= 140) {
        $.ajax({
          method: "POST",
          url: "/tweets",
          data: $tweetText,
          dataType: "text",
          success: function (response) {
            console.log(response);
            
            loadTweets();
          }
        });
      } else {
        alert("Tweets are limited to 140 characters")
      }
    } else {
      alert("Your tweet is blank");
    }
  });

});