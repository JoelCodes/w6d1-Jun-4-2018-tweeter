import React from 'react';
import { get } from 'axios';

import NavBar from './NavBar.jsx';
import NewTweetForm from './NewTweetForm.jsx';
import TweetsSection from './TweetsSection.jsx';

export default class Tweeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  componentDidMount() {
    this.loadTweets();
  }

  loadTweets() {
    // Do an ajax call.
    get('/tweets')
      .then(({ data }) => {
        this.setState({ tweets: data });
      });
  }

  render() {
    const { tweets } = this.state;
    return (
      <div>
        <NavBar />
        <main className="container">
          <NewTweetForm />
          <TweetsSection tweets={tweets} />
        </main>
      </div>
    );
  }
}
