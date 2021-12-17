$(document).ready(function() {
  $('#tweet-text').on('keyup', () => {
    $('.counter').text(140 - $('#tweet-text').val().length);
    if (($('.counter').text()) < 0) {
      $('.counter').addClass('overCharacterLimit');
    } else {
      $('.counter').removeClass('overCharacterLimit');
    }
  });
});






