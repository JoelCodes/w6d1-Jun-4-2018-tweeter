import React from 'react';

export default function NavBar() {
  return (
    <nav id="nav-bar">
      <section>
        <img className="tweeterlogo" src="images/bird.png" alt="Tweeter" />
        <span className="header">Tweeter</span>
        <i className="far fa-edit fa-3x" id="togglenewtweet" />
      </section>
    </nav>
  );
}
// export default class NavBar extends React.Component {
//   render() {
//     return (
//       <nav id="nav-bar">
//         <section>
//           <img className="tweeterlogo" src="images/bird.png" alt="Tweeter" />
//           <span className="header">Tweeter</span>
//           <i className="far fa-edit fa-3x" id="togglenewtweet" />
//         </section>
//       </nav>
//     );
//   }
// }
