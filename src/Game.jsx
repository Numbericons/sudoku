import React from 'react';
import Board from './Board.jsx';
import logo from './logo.svg';
import './stylesheets/input.scss';


class Game extends React.Component {
  constructor(props) {
    super(props)
  }

  gameOver(){}
  chkBoard(){}
  play(){}
  logo() {
    let logos = [];
    for (let z = 0; z < 3; z++) {
      logos.push(<img src={logo} className="App-logo" alt="logo" />)
    }
    return (
      <div>
        {logos}
      </div>
    )
  }

  render() {
    const logos = this.logo();
    return <div className='main'>
      <div>
        <Board></Board>
        {logos}
        {logos}
        {logos}
        <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
    </div>
  }
}

export default Game;