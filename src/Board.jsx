import React from 'react';
import Square from './Square.jsx';
import Number from './Number.jsx';
import {buildBoard} from './boardBuilder.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      showNotes: false,
      check: false,
      grid: this.getBoard()
    }
    this.won = false;
    this.select = this.select.bind(this);
    this.setNotes = this.setNotes.bind(this);
    this.setCheck = this.setCheck.bind(this);
    this.changeVal = this.changeVal.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
                           check={this.state.check}
                   ></Square>;

      squares.push(square);
    }

    return <div className="box-row">{squares}</div>
  }

  box(idx) {
    return <div className="box">
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
    return <div className="grid">
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

  // componentDidMount() {
  //   $(document.body).on('keydown', this.props.onKeyDown);
  // }

  // componentDidMount() {
  //   document.addEventListener(“keydown”, this.handleKeyDown.bind(this))
  // }

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
    let val = e.target.innerHTML ? parseInt(e.target.innerHTML) : 'eraser';
    this.setState({ selected: val})
  }

  numbers() {
    let numbers = [];

    for (let z=1;z<10;z++) {
      let selected = this.state.selected === z;
      numbers.push(<Number key={z} value={z} select={this.select} selected={selected} onKeyDown={this.handleKeyDown}></Number>);
    }

    numbers.push(<Number key='eraser' value={<i className="fa fa-eraser"></i>} select={this.select} 
                  selected={this.state.selected === 'eraser'} onKeyPress={this.handleKeyDown}>
                 </ Number>);

    numbers.push(<Number key='refresh' value={<i className="fa fa-refresh"></i>} isRefresh={true}></ Number>);
    numbers.push(<Number key='notes' value={<i className="fa fa-file-text-o"></i>} setNotes={this.setNotes} isNotes={true} notesOn={this.state.showNotes}></ Number>);
    numbers.push(<Number key='check' value={<i className="fa fa-check-square-o"></i>} setCheck={this.setCheck} checkVal={true} checkOn={this.state.check}></ Number>);

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
      this.won = true;
      alert('Congratulations, you have won!');
    }
  }

  render() {
    return <div className='board'>
      {this.build()}
      {this.numbers()}
    </div>
  }
}

export default Board;