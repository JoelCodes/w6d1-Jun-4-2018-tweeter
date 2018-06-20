/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function toggleNewTweetElement() {
  $('#new-tweet-container').slideToggle(function() {
    $('textarea').focus();
  })
}


let tweetsDisplayed = 0;
function createTweetElement(tweetData) {
  let days = moment(tweetData.created_at).fromNow();

  $(`#new-tweet-container`).after(`<article class="tweet" id="${tweetsDisplayed}">`);
  $(`#${tweetsDisplayed}`).append('<header>');
  $(`#${tweetsDisplayed} header`).append(`<img src="${tweetData.user.avatars.small}" alt="user avatar" width="50px" height="50px">`);
  $(`#${tweetsDisplayed} header`).append('<h2>')
  $(`#${tweetsDisplayed} header h2`).text(tweetData.user.name);
  $(`#${tweetsDisplayed} header`).append('<h6>')
  $(`#${tweetsDisplayed} header h6`).text(tweetData.user.handle);
  $(`#${tweetsDisplayed} header`).after('<p>')
  $(`#${tweetsDisplayed} p`).text(tweetData.content.text);
  $(`#${tweetsDisplayed} p`).after('<footer>');
  $(`#${tweetsDisplayed} footer`).append(`<p>${days}</p>`)
  $(`#${tweetsDisplayed} footer`).append('<i class="fas fa-heart">');
  $(`#${tweetsDisplayed} footer`).append('<i class="fas fa-retweet">');
  $(`#${tweetsDisplayed} footer`).append('<i class="fas fa-flag">');
  $(`#${tweetsDisplayed}`).fadeIn(1500);
  tweetsDisplayed += 1;
}


function renderTweets(tweetData) {
  tweetData.map(tweet => {
    createTweetElement(tweet);
  });
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

    let userEnteredText = event.target[0].value;
    let $tweetText = $(".new-tweet form").serialize();

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

  $('#togglenewtweet').on('click', function () {
    toggleNewTweetElement();
  });

});