import React from 'react';

export default function NewTweetForm({ addTweet }) {
  const onSubmit = (event) => {
    event.preventDefault();
    const textArea = event.target.text;
    addTweet(textArea.value);
    textArea.value = '';
  };

  return (
    <section className="new-tweet" id="new-tweet-container" style={{ display: 'block' }}>
      <h2>Compose Tweet</h2>
      <form onSubmit={onSubmit}>
        <textarea id="tweetinput" name="text" placeholder="What are you humming about?" />
        <input type="submit" value="Tweet" />
        <span className="counter">140</span>
      </form>
    </section>
  );
}
