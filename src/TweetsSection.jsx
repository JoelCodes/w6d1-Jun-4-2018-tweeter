/* global moment */
import React from 'react';

function Tweet({
  tweet: {
    user: {
      avatars: { small: smallAvatar }, name, handle,
    },
    content: { text },
    created_at,
  },
}) {
  return (
    <article className="tweet" id="0" style={{ display: 'block' }}>
      <header><img src={smallAvatar} alt="user avatar" width="50px" height="50px" /><h2>{name}</h2><h6>{handle}</h6></header>
      <p>{text}</p>
      <footer>
        <p>{moment(created_at).fromNow()}</p>
        <i className="fas fa-heart" id="like" /><i className="fas fa-retweet" id="retweet" /><i className="fas fa-flag" id="flag" />
      </footer>
    </article>
  );
}

export default function TweetsSection({ tweets }) {
  const tweetItems = tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} />);
  return (
    <section>
      {tweetItems}
    </section>
  );
}
