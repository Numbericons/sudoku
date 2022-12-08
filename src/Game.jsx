import React from 'react';
import Board from './Board.jsx';
import EntryForm from './EntryForm.jsx';
import './stylesheets/input.scss';
import Timer from 'react-compound-timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.loads = 1;
    this.state = { difficulty: null, background: 1 };

    this.setDifficulty = this.setDifficulty.bind(this);
    this.setBackground = this.setBackground.bind(this);
  }
  
  gameOver(){}
  chkBoard(){}
  play(){}

  setDifficulty(e, difficulty) {
    this.setState({ difficulty: difficulty });
  }
  
  setBackground(number) {
    this.setState({ background: parseInt(number) });
  }

  getBackground() {
    const backgroundRef = {
      1: 'midjourney3.png',
      2: 'midjourney6.png',
      3: 'midjourney8.png',
      4: 'midjourney5.png',
      5: 'backgroundRedSand.jpg'
    }

    let name = backgroundRef[this.state.background];
    if (!name) name = backgroundRef[1];
    return `url(${name})`;
  }
 
  render() {
    if (!this.state.difficulty) {
      return <div>
        <EntryForm setDifficulty={this.setDifficulty}></EntryForm>
      </div>
    }

    const backgroundUrl = this.getBackground();

    return <div className='main' style={{ backgroundImage: backgroundUrl, backgroundSize: 'auto'}} >
      <div className='main-head'>
        <h1 className='main-head-text'>Sudoku</h1>
        <div className='timer'>
          <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}>
            <Timer.Hours formatValue={value => value === 0 ? '00:' : `${(value < 10 ? `0${value}` : value)}:`} />
            <Timer.Minutes formatValue={value => value === 0 ? '00:' : `${(value < 10 ? `0${value}` : value)}:`}/>
            <Timer.Seconds formatValue={value => value === 0 ? '00' : `${(value < 10 ? `0${value}` : value)}`}/>
          </Timer>
        </div>
      </div>
      <div className='main-body'>
        <div></div>
        <Board val={parseInt(this.state.difficulty)} setBackground={this.setBackground}></Board>
        <div></div>
      </div>
      <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  }
}

export default Game;