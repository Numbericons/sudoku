import React from 'react';
import Square from './Square.jsx';
import Number from './Number.jsx';
import {buildBoard} from './boardBuilder.js';
import WinModal from "./WinModal.jsx";
import InfoModal from "./InfoModal.jsx";
import BackgroundModal from "./BackgroundModal.jsx";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      showNotes: false,
      check: true,
      background: 1,
      grid: this.getBoard(),
      showWinModal: false,
      showInfoModal: false,
      showBackgroundModal: true,
      size: 'normal'
    }
    this.select = this.select.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.setCheck = this.setCheck.bind(this);
    this.changeVal = this.changeVal.bind(this);
    this.setBackground = this.setBackground.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleWinModal = this.toggleWinModal.bind(this);
    this.toggleInfoModal = this.toggleInfoModal.bind(this);
    this.toggleBackgroundModal = this.toggleBackgroundModal.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  changeVal(e,idx) {
    let newGrid = JSON.parse(JSON.stringify(this.state.grid));
    newGrid[idx][2] = this.state.selected === 'eraser' ? "" : this.state.selected;
    this.setState({grid: newGrid});
  }

  getBoard(len = 3) {
    let grid = buildBoard(len, this.props.val);
    while (grid.length < 81) grid = buildBoard(len, this.props.val);

    return grid;
  }

  row(idx) {
    let squares = [];

    for (let i=0;i<3;i++) {
      let square = <Square key={idx + i} idx={idx + i} attr={this.state.grid[idx + i]} 
                           showNotes={this.state.showNotes} change={this.changeVal}
                           check={this.state.check} darkmodeOn={this.props.darkmodeOn}
                           size={this.state.size}>
                   </Square>;

      squares.push(square);
    }

    return <div className={this.props.darkmodeOn ? "box-row-dark" : "box-row"}>{squares}</div>
  }

  box(idx) {
    return <div className={this.props.darkmodeOn ? "box-dark" : "box"}>
      {this.row(idx)}
      {this.row(idx+3)}
      {this.row(idx+6)}
    </div>
  }

  boxRow(idx) {
    return <div className="grid-row-box-row">
      {this.box(idx)}
      {this.box(idx+9)}
      {this.box(idx+18)}
    </div>
  }

  build() {
    const gridClass = this.state.size === 'normal' ? 'grid' : 'grid-small';

    return <div className={gridClass}>
      <div className="grid-row">
        {this.boxRow(0)}
      </div>
      <div className="grid-row">
        {this.boxRow(27)}
      </div>
      <div className="grid-row">
        {this.boxRow(54)}
      </div>
    </div>
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.setState({ showWinModal: this.win() });
  }

  select(e) {
    let val = e.target.innerHTML ? parseInt(e.target.innerHTML) : 'eraser';
    this.setState({ selected: val})
  }

  setNotes(e) {
    this.setState({ showNotes: !this.state.showNotes});
  }

  setCheck(e) {
    this.setState({ check: !this.state.check});
  }

  handleKeyDown(e) {
    const nums = '123456789';
    let val = e.key;

    if (nums.includes(val)) this.setState({ selected: parseInt(val) })

    if (val === 'e') this.setState({ selected: 'eraser' });

    if (val === 'n') this.setNotes();
  }

  buttons(){
    const containerClass = this.state.size === 'normal' ? 'btn-cont' : 'btn-cont-small';

    let buttons = [];
    buttons.push(<Number key='notes' value={<i className="fa fa-file-text-o"></i>} setNotes={this.setNotes} 
                         isNotes={true} notesOn={this.state.showNotes} darkmodeOn={this.props.darkmodeOn}></ Number>);
    buttons.push(<Number key='refresh' value={<i className="fa fa-refresh"></i>} isRefresh={true} darkmodeOn={this.props.darkmodeOn}></ Number>);
    buttons.push(<Number key='check' value={<i className="fa fa-check-square-o"></i>} setCheck={this.setCheck}
                         checkVal={true} checkOn={this.state.check} darkmodeOn={this.props.darkmodeOn}></ Number>);
    

    buttons.push(<Number key='size' size={this.state.size} darkmodeOn={this.props.darkmodeOn} updateSize={this.updateSize}></ Number>);
    buttons.push(<Number key='darkmode' value={<i className="number-darkmode" href={'Yin_yang.svg'}></i>} darkmode={true}
                         darkmodeOn={this.props.darkmodeOn}  toggleDarkmode={this.props.toggleDarkmode}></ Number>);
    buttons.push(<Number key='backgroundModal' value={<i className="fa fa-picture-o"></i>} backgroundModal={true}
                         showBackgroundModal={this.toggleBackgroundModal} darkmodeOn={this.props.darkmodeOn}></ Number>);
    buttons.push(<Number key='info' value={<i className="fa fa-info-circle"></i>} isInfo={true} showInfo={this.toggleInfoModal} darkmodeOn={this.props.darkmodeOn}></ Number>);

    return <div className={containerClass}>{buttons}</div>
  }

  usedNumbers(){
    const numbers = [1,2,3,4,5,6,7,8,9];
    let count = {};

    for (let i=0; i<this.state.grid.length; i++){
      const cell = this.state.grid[i];
      let num = cell[1] ? cell[0] : cell[2];
      
      if (num) {
        count[num] = count[num] ? count[num] + 1 : 1;
      }
    }
    return numbers.filter(num=> {
      return count[num] > 8
    });
  }

  numbers() {
    let numbers = [];
    const used = this.usedNumbers();

    for (let z=1;z<10;z++) {
      if (used.includes(z)) continue;

      let selected = this.state.selected === z;
      numbers.push(<Number key={z} value={z} select={this.select} selected={selected} 
        onKeyDown={this.handleKeyDown} darkmodeOn={this.props.darkmodeOn}></Number>);
    }

    numbers.push(<Number key='eraser' value={<i className="fa fa-eraser"></i>} select={this.select} 
                         selected={this.state.selected === 'eraser'} onKeyPress={this.handleKeyDown} darkmodeOn={this.props.darkmodeOn}>
                 </ Number>);

    return <div className='numb-cont'>{numbers}</div>
  }

  chkIndices(object) {
    const keys = Object.keys(object);

    for (let i=0; i<keys.length; i++) {
      let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let j=0; j<object[keys[i]].length; j++) {
        const arr = this.state.grid[object[keys[i]][j]];
        const num = arr[1] ? arr[0] : arr[2];
        const idx = numbers.indexOf(num);

        if (idx === -1) return false;
        numbers.splice(idx, 1);
      }
    }

    return true;
  }

  win() {
    const cages = {
      1: [0, 1, 2, 3, 4, 5, 6, 7, 8], 2: [9, 10, 11, 12, 13, 14, 15, 16, 17], 3: [18, 19, 20, 21, 22, 23, 24, 25, 26],
      4: [27, 28, 29, 30, 31, 32, 33, 34, 35], 5: [36, 37, 38, 39, 40, 41, 42, 43, 44], 6: [45, 46, 47, 48, 49, 50, 51, 52, 53],
      7: [54, 55, 56, 57, 58, 59, 60, 61, 62], 8: [63, 64, 65, 66, 67, 68, 69, 70, 71], 9: [72, 73, 74, 75, 76, 77, 78, 79, 80]
    }
    const rows = {
      1: [0, 1, 2, 9, 10, 11, 18, 19, 20], 2: [3, 4, 5, 12, 13, 14, 21, 22, 23], 3: [6, 7, 8, 15, 16, 17, 24, 25, 26],
      4: [27, 28, 29, 36, 37, 38, 45, 46, 47], 5: [30, 31, 32, 39, 40, 41, 48, 49, 50], 6: [33, 34, 35, 42, 43, 44, 51, 52, 53],
      7: [54, 55, 56, 63, 64, 65, 72, 73, 74], 8: [57, 58, 59, 66, 67, 68, 75, 76, 77], 9: [60, 61, 62, 69, 70, 71, 78, 79, 80]
    }
    const columns = {
      1: [60, 57, 54, 33, 30, 27, 6, 3, 0], 2: [61, 58, 55, 34, 31, 28, 7, 4, 1], 3: [62, 59, 56, 35, 32, 29, 8, 5, 2],
      4: [69, 66, 63, 42, 39, 36, 15, 12, 9], 5: [70, 67, 64, 43, 40, 37, 16, 13, 10], 6: [71, 68, 65, 44, 41, 38, 17, 14, 11],
      7: [78, 75, 72, 51, 48, 45, 24, 21, 18], 8: [79, 76, 73, 52, 49, 46, 25, 22, 19], 9: [80, 77, 74, 53, 50, 47, 26, 23, 20]
    }

    return this.chkIndices(cages) && this.chkIndices(rows) && this.chkIndices(columns);
  }

  componentDidUpdate() {
    if (!this.won && this.win()) {

      if (!this.state.won) {
        this.setState({ won: true, showWinModal: true })
      }
    }
  }

  toggleWinModal(e) {
    this.setState({ showWinModal: !this.state.showWinModal })
  }

  toggleInfoModal(e) {
    this.setState({ showInfoModal: !this.state.showInfoModal })
  }
  
  updateSize(e) {
    const newSize = this.state.size === 'normal' ? 'small' : 'normal';

    this.setState({ size: newSize });
  }

  toggleBackgroundModal(e) {
    this.setState({ showBackgroundModal: !this.state.showBackgroundModal })
  }

  setBackground(e) {
    const background = e.target.attributes.value.value || null;

    this.setState({ background: background, showBackgroundModal: false });
    this.props.setBackground(background);
  }

  render() {
    const boardClass = this.state.size === 'normal' ? 'board' : 'board-small';

    return <div className={boardClass}>
      {this.build()}
      {this.buttons()}
      {this.numbers()}
      <WinModal onClose={this.toggleWinModal} show={this.state.showWinModal}/>
      <InfoModal onClose={this.toggleInfoModal} show={this.state.showInfoModal}/>
      <BackgroundModal onClose={this.toggleBackgroundModal} show={this.state.showBackgroundModal} setBackground={this.setBackground}/>
    </div>
  }
}

export default Board;