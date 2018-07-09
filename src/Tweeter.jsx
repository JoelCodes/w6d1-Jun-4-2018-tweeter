import React from 'react';
import { get, post } from 'axios';

import NavBar from './NavBar.jsx';
import NewTweetForm from './NewTweetForm.jsx';
import TweetsSection from './TweetsSection.jsx';

export default class Tweeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
    this.addTweet = this.addTweet.bind(this);
    this.loadTweets = this.loadTweets.bind(this);
  }

  componentDidMount() {
    this.loadTweets();
  }

  loadTweets() {
    // Do an ajax call.
    get('/tweets')
      .then(({ data }) => {
        this.setState({ tweets: data.sort((a, b) => b.created_at - a.created_at) });
      });
  }

  addTweet(text) {
    post('/tweets', { text })
      .then(this.loadTweets);
  }

  render() {
    const { tweets } = this.state;
    return (
      <div>
        <NavBar />
        <main className="container">
          <NewTweetForm addTweet={this.addTweet} />
          <TweetsSection tweets={tweets} />
        </main>
      </div>
    );
  }
}
