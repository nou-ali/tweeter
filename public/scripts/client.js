$(document).ready(function() {

  //hide error messages until the errors are committed
  $('.error1').hide();
  $('.error2').hide();

  const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      data: 'json',
      success: (data) => {
        renderTweets(data);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
  };

  loadTweets();

  const createTweetElement = function(tweet) {
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $htmlTweetsContainer = $(`
 <section class="tweetContainer">
 <article>
     <header class="avatar">
       <div class="avatarProfile">
         <!-- <i class="fas fa-user-ninja"></i> -->
         <img class="avatarImage" src=${tweet.user.avatars} alt="">
         <span class="avatarName">${tweet.user.name}</span>
       </div>
       <span>${tweet.user.handle}</span>
     </header>
     <div class= "lineForBox">
       <p class="textInContainer">${escape(tweet.content.text)}</p>
     </div>
     <footer class="bottomComponents">
       <span class= "daysCounter">${timeago.format(tweet.created_at)}</span>
       <div class="icons">
         <i class="fas fa-heart"></i>
         <i class="fas fa-retweet"></i>
         <i class="fas fa-flag"></i>
       </div>
     </footer>
 </article> 
 </section> `);
    return $htmlTweetsContainer;
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $htmlTweetsContainer = createTweetElement(tweet);
      $('#tweetContainer').prepend($htmlTweetsContainer);
    }
  };

  const $form = $('#tweeter-form');
  $form.on('submit', function(event) {
    event.preventDefault();

    //error handling
    const serializedData = $(this).serialize();
    console.log(serializedData);
    const tweetValidation = $('#tweet-text').val().length;

    //If it does work use slide up method
    if (tweetValidation > 140) {
      $('.error1').text("Hey there! We know you have a lot to say but please keep to 140 characters.");
      $('.error1').slideDown("slow").slideUp(3000);
      return;
    }
    if (tweetValidation === 0) {
      $('.error2').text("Hmmm... you didn't write anything. Don't be shy, try again.");
      $('.error2').slideDown("slow").slideUp(3000);
      return;
    }

 
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: serializedData,
      success: (data) => {
        $("#tweet-text").val("");
        console.log("success");
        $.get("http://localhost:8080/tweets", (serverResponse) => {
          const newTweet = [serverResponse.slice(-1).pop()];
          renderTweets(newTweet);
        });

      }
    });

  });


});




