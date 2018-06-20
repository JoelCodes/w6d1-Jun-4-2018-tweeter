function getCurrentCharCount(text) {
  let stringLength = $(text).val().length;
  return stringLength;
}

function charCountUpdate(counterToUpdate, textLengthCallBack) {
  let currentCount = textLengthCallBack;
  let newCount = 140 - currentCount;
  $(counterToUpdate).text(newCount);
}

function charColorUpdate(counterToUpdate, textLengthCallBack) {
  let currentCount = textLengthCallBack;
  let newCount = 140 - currentCount;
  if (newCount < 0) {
    $(counterToUpdate).css('color', 'red');
  } else {
    $(counterToUpdate).css('color', 'black');
  }
}

$(document).ready(function () {
  // keydown and keyup because keypress doesn't register highlight all text and deleting
  $('#new-tweet-container').on('keydown keyup', function (e) {
    charCountUpdate('.new-tweet span', getCurrentCharCount('.new-tweet textarea'));
    charColorUpdate('.new-tweet span', getCurrentCharCount('.new-tweet textarea'));
  });


});