import React from 'react';

import NavBar from './NavBar.jsx';
import NewTweetForm from './NewTweetForm.jsx';
import TweetsSection from './TweetsSection.jsx';

export default class Tweeter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [{
        _id: '5b43d77b9d0e4153d6933359', user: { name: 'Jane Baglioni', handle: '@Baglioni3', avatars: { small: 'https://vanillicon.com/ff7423e00a99cc9865e6d722f4c636d6_50.png', regular: 'https://vanillicon.com/ff7423e00a99cc9865e6d722f4c636d6.png', large: 'https://vanillicon.com/ff7423e00a99cc9865e6d722f4c636d6_200.png' } }, content: { text: 'Stuff and things.' }, created_at: 1531172731011,
      }],
    };
  }

  componentDidMount() {
    // Do an ajax call.

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
