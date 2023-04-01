import React from 'react';
import Board from './Board.jsx';
import EntryForm from './EntryForm.jsx';
import './stylesheets/input.scss';
import Timer from 'react-compound-timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.loads = 1;
    this.state = {
      difficulty: null,
      background: 1,
      showModals: true,
      darkmode: false,
      isLoading: true
    };

    this.setDifficulty = this.setDifficulty.bind(this);
    this.setBackground = this.setBackground.bind(this);
    this.toggleModals = this.toggleModals.bind(this);
    this.toggleDarkmode = this.toggleDarkmode.bind(this);
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
      1: 'background1.webp',
      2: 'background2.webp',
      3: 'background3.webp',
      4: 'background4.webp',
      5: 'background5.webp',
      6: 'background6.webp',
      7: 'background7.webp',
      8: 'background8.webp',
      9: 'background9.webp',
      10: 'background10.webp',
      11: 'background11.webp',
      12: 'background12.webp',
      13: 'background13.webp',
      14: 'background14.webp',
      15: 'background15.webp'
    }

    let name = backgroundRef[this.state.background];
    if (!name) name = backgroundRef[1];
    return `url(${name})`;
  }

  toggleModals() {
    this.setState({ showModals: !this.state.showModals });
  }
  
  toggleDarkmode() {
    this.setState({ darkmode: !this.state.darkmode });
  }

  componentDidMount() {
    this.demoAsyncCall().then(() => {
      // this.props.hideLoader();
      this.setState({ isLoading: false })
    });
  }

  demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 1500));
  }
 
  render() {
    if (this.state.isLoading) {
      return <div></div>
    }
    if (!this.state.difficulty) {
      return <div>
        <EntryForm setDifficulty={this.setDifficulty} hideLoader={this.props.hideLoader}></EntryForm>
      </div>
    }

    const backgroundUrl = this.getBackground();
    let headText = this.state.darkmode ? 'main-head-text-dark' : 'main-head-text';
    let timerClass = this.state.darkmode ? 'timer-dark' : 'timer';

    return <div className='main' onClick={this.toggleModals} style={{ backgroundImage: backgroundUrl, backgroundSize: 'cover'}} >
        <div className='main-head'>
          <h1 className={headText}>Sudoku</h1>
          <div className={timerClass}>
            <Timer formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} darkmodeOn={this.state.darkmode}>
              <Timer.Hours formatValue={value => value === 0 ? '00:' : `${(value < 10 ? `0${value}` : value)}:`} />
              <Timer.Minutes formatValue={value => value === 0 ? '00:' : `${(value < 10 ? `0${value}` : value)}:`}/>
              <Timer.Seconds formatValue={value => value === 0 ? '00' : `${(value < 10 ? `0${value}` : value)}`}/>
            </Timer>
          </div>
        </div>
        <div className='main-body'>
          <div></div>
          <Board val={parseInt(this.state.difficulty)} setBackground={this.setBackground} toggleDarkmode={this.toggleDarkmode} darkmodeOn={this.state.darkmode}></Board>
          <div></div>
        </div>
        <div className="hide">Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div className="hide">Copywrite 2022 Zachary Oliver</div>
      </div>
  }
}

export default Game;