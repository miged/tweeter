/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    const html = `
      <article class="tweet">
        <header>
          <div class="user">
            <img class="avatar" src=${escape(data.user.avatars)}>
            <div class="username">${escape(data.user.name)}</div>
          </div>
          <div class="userhandle">${escape(data.user.handle)}</div>
        </header>
        <div class="content">${escape(data.content.text)}</div>
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
    $('#tweets-container').empty();
    for (const tweet of tweets.reverse()) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((data) => renderTweets(data));
  };

  loadTweets();

  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const text = $('#tweet-text').val();

    if (!text) {
      window.alert("Error: Cannot post empty tweet.");
      return;
    }

    if (text.length > 140) {
      window.alert("Error: Tweet is too long.");
      return;
    }

    const formData = $('#tweet-form').serialize();
    $.ajax("/tweets", {
      method: "POST",
      data: formData,
      success: loadTweets
    });
  });
});
