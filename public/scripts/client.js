/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
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
      "created_at": 1611113959088
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1561116232227
    }
  ];

  const createTweetElement = (data) => {
    const html = `
      <article class="tweet">
        <header>
          <div class="user">
            <img class="avatar" src=${data.user.avatars}>
            <div class="username">${data.user.name}</div>
          </div>
          <div class="userhandle">${data.user.handle}</div>
        </header>
        <div class="content">${data.content.text}</div>
        <footer>
          <div class="time">${timeago.format(data.created_at)}</div>
          <div class="actions">
            <a href="/"><i class="fas fa-flag"></i></a>
            <a href="/"><i class="fas fa-retweet"></i></a>
            <a href="/"><i class="fas fa-heart"></i></a>
          </div>
        </footer>
      </article>
    `;

    return html;
  };

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  renderTweets(data);

  $('#tweet-button').submit(function(event) {
    event.preventDefault();
    const data = $('#tweet-form').serialize();
    console.log(data);
  });
});
