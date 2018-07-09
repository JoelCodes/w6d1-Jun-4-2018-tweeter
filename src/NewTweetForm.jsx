import React from 'react';

const DEFAULT_LIMIT = 140;
export default class NewTweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.submitText = this.submitText.bind(this);
  }

  changeText(text) {
    this.setState({ text });
  }

  submitText() {
    const { text } = this.state;
    const { sendAlert, limit = DEFAULT_LIMIT, addTweet } = this.props;
    if (text.length === 0) {
      sendAlert('No Text');
    } else if (text.length > limit) {
      sendAlert('Text too long');
    } else {
      addTweet(text);
      this.setState({ text: '' });
    }
  }

  render() {
    const { text } = this.state;
    const { limit = DEFAULT_LIMIT } = this.props;
    const onSubmit = (event) => {
      event.preventDefault();
      this.submitText();
    };
    return (
      <section className="new-tweet" id="new-tweet-container" style={{ display: 'block' }}>
        <h2>Compose Tweet</h2>
        <form onSubmit={onSubmit}>
          <textarea onChange={event => this.changeText(event.target.value)} id="tweetinput" name="text" placeholder="What are you humming about?" value={text} />
          <input type="submit" value="Tweet" />
          <span className="counter" style={{ color: text.length > limit ? 'red' : 'black' }}>{limit - text.length}</span>
        </form>
      </section>
    );
  }
}
