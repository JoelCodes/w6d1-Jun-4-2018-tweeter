/* eslint-env browser */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './NavBar.jsx';
import NewTweetForm from './NewTweetForm.jsx';
import TweetsSection from './TweetsSection.jsx';

const jsxExpr = (
  <div>
    <NavBar />
    <main className="container">
      <NewTweetForm />
      <TweetsSection />
    </main>
  </div>
);
const root = document.getElementById('root');
ReactDOM.render(jsxExpr, root);
