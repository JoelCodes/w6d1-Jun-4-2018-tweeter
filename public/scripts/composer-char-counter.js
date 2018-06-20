$(document).ready(function () {
  // keydown and keyup because keypress doesn't register highlight all text and deleting
  $('#new-tweet-container').on('keydown keyup', function (event) {
    let textLength = event.target.textLength;
    let newCount = 140 - textLength;
    $('#new-tweet-container span').text(newCount);
    if (textLength > 140) {
      $('#new-tweet-container span').css('color', 'red');
    } else {
      $('#new-tweet-container span').css('color', 'black');
    }
  });
});