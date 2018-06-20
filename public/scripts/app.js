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

function createTweetElement(tweetData) {
  let dateCreated = new Date(tweetData.created_at);
  let days = getDaysSince(dateCreated);
  return $.parseHTML(`<article class="tweet"><header><img src="${tweetData.user.avatars.small}" alt="user avatar" width="50px" height="50px"><h2>${tweetData.user.name}</h2><h6>${tweetData.user.handle}</h6></header><p>${tweetData.content.text}</p><footer><p>${days} days ago</p><i class="fas fa-heart"></i><i class="fas fa-retweet"></i><i class="fas fa-flag"></i></footer></article>`);
}

function renderTweets(tweetData) {
  for (let i = 0; i < tweetData.length; i++) {
    var $tweet = createTweetElement(tweetData[i]);
    $($tweet).insertAfter('.new-tweet');
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
  });

});