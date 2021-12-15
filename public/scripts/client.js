// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function () {

  const loadTweets = function ()  {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      data: 'json',
      success: (data) => {
        console.log(data);
        renderTweets(data);
      },
      error: (err) => {
        console.log(`error: ${err}`)
      } 
    });
  };

  loadTweets();

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

 
  

