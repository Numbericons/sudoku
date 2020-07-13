import React from 'react';
import Board from './Board.jsx';
// import logo from './logo.svg';
import './stylesheets/input.scss';


class Game extends React.Component {
  // constructor(props) {
    // super(props);
    // this.val = prompt("Choose difficulty, enter 1 for easy, 2 for medium and 3 for hard:")
  // }
  // componentDidMount() {
  //   this.val = prompt("Choose difficulty between 1 to 100 larger numbers are harder:")
  // }

  gameOver(){}
  chkBoard(){}
  play(){}

  render() {
    return <div className='main'>
      <div className='main-head'>
        <h1 className='main-head-text'>Sudoku</h1>
      </div>
      <div className='main-body'>
        <div></div>
        {/* <Board difficulty={50}></Board> */}
        <Board difficulty={this.val}></Board>
        <div></div>
      </div>
      <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  }
}

export default Game;