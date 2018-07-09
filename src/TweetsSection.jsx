import React from 'react';

function Tweet() {
  return (
    <article className="tweet" id="0" style={{ display: 'block' }}>
      <header><img src="https://vanillicon.com/ff7423e00a99cc9865e6d722f4c636d6_50.png" alt="user avatar" width="50px" height="50px" /><h2>Jane Baglioni</h2><h6>@Baglioni3</h6></header>
      <p>Stuff and things.</p>
      <footer>
        <p>a few seconds ago</p>
        <i className="fas fa-heart" id="like" /><i className="fas fa-retweet" id="retweet" /><i className="fas fa-flag" id="flag" />
      </footer>
    </article>
  );
}

export default function TweetsSection() {
  return (
    <section>
      <Tweet />
    </section>
  );
}
