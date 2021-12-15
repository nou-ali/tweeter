// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // $('#tweetContainer').empty();

  for (const tweet of tweets) {
    const $htmlTweetsContainer = createTweetElement(tweet);
    $('#tweetContainer').prepend($htmlTweetsContainer);
  }
};

const createTweetElement = function(tweet) {
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
       <p class="textInContainer">${tweet.content.text}</p>
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
 </section> `)
  return $htmlTweetsContainer;
};

// let $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
//console.log($tweet); // 
// $('.tweetContainer').append($tweet); 

renderTweets(tweetData);

const $form = $('#tweeter-form');
$form.on('submit', function(event){
  event.preventDefault();
  const serializedData = $(this).serialize();
  console.log(serializedData)

  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'POST',
    data: serializedData,
    success: (data) => {
      console.log("success");
  }  
  })
});

  
  });

 
