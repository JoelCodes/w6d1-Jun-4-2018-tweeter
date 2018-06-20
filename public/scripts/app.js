/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function getDaysSince(referenceDateObject) {
  let today = new Date();
  let diff = new Date(today - referenceDateObject);
  let days = diff / 1000 / 60 / 60 / 24;
  return parseInt(days);
}


let newTweetVisable = false;

function toggleNewTweetElement() {
  if (!newTweetVisable) {
    $('.new-tweet').slideDown();
    $('textarea').focus().select();
    newTweetVisable = true;
  } else {
    $('.new-tweet').slideUp();
    newTweetVisable = false;
  }
}


function createNewTweetElement() {
  let $newTweet = $.parseHTML(`<section class="new-tweet"><h2>Compose Tweet</h2><form><textarea name="text" placeholder="What are you humming about?"></textarea><input type="submit" value="Tweet"><span class="counter">140</span></form></section>`);
  $('#new-tweet-container').prepend($newTweet);
}


let tweetsDisplayed = 0;

function createTweetElement(tweetData) {
  let dateCreated = new Date(tweetData.created_at);
  let days = getDaysSince(dateCreated);

  $(`#new-tweet-container`).after(`<article class="tweet ${tweetsDisplayed}">`);
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
  $('article.tweet').fadeIn(1500);
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

  $("#new-tweet-container").on("submit", function (event) {
    event.preventDefault();

    let $tweetText = $(".new-tweet form").serialize();
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


  $('nav i').one('click', function () {
    createNewTweetElement();
  });


  $('nav i').on('click', function () {
    toggleNewTweetElement();
  });

});