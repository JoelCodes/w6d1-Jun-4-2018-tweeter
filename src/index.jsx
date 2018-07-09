/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';

const jsxExpr = (
  <div>
    <nav id="nav-bar">
      <section>
        <img className="tweeterlogo" src="images/bird.png" alt="Tweeter" />
        <span className="header">Tweeter</span>
        <i className="far fa-edit fa-3x" id="togglenewtweet" />
      </section>
    </nav>

    <main className="container">
      <section className="new-tweet" id="new-tweet-container" style={{ display: 'block' }}>
        <h2>Compose Tweet</h2>
        <form>
          <textarea id="tweetinput" name="text" placeholder="What are you humming about?" />
          <input type="submit" value="Tweet" />
          <span className="counter">140</span>
        </form>
      </section><article className="tweet" id="0" style={{ display: 'block' }}><header><img src="https://vanillicon.com/ff7423e00a99cc9865e6d722f4c636d6_50.png" alt="user avatar" width="50px" height="50px" /><h2>Jane Baglioni</h2><h6>@Baglioni3</h6></header><p>Stuff and things.</p><footer><p>a few seconds ago</p><i className="fas fa-heart" id="like" /><i className="fas fa-retweet" id="retweet" /><i className="fas fa-flag" id="flag" /></footer></article>
    </main>
  </div>
);
const root = document.getElementById('root');
ReactDOM.render(jsxExpr, root);
