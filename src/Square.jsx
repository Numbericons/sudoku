import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.attr[0],
      revealed: props.attr[1],
      entered: props.attr[2]
    }
    this.enterVal = this.enterVal.bind(this);
  }

  enterVal(e) {
    this.props.change(e, this.props.idx)
  }

  renderFixed() {
    let divClass = this.props.darkmodeOn ? 'square-dark' : 'square';
    let text = this.props.darkmodeOn ? 'square-revealed-dark' : 'square-revealed';

    if (this.props.size === 'small') {
      divClass += '-small';
      text += '-small';
    }

    return <div className={divClass}>
      <h3 className={text}>
        {this.state.value}
      </h3>
    </div>
  }

  renderNotes(val) {
    let divClass = 'square';
    let square = 'square-entered';
    let squareInput = 'square-input';

    if (this.props.darkmodeOn) {
      divClass += '-dark';
      square += '-dark';
      squareInput += '-dark';
    }

    if (this.props.size === 'small') {
      divClass += '-small';
      square += '-small';
      squareInput += '-small';
    }

    return <div className={divClass}>
      <h3 className={square} onClick={this.enterVal}>{val}</h3>
      <input className={squareInput} type="text" />
    </div>
  }
 
  isIncorrect(){
    //attr[0] is the actual value and attr[2] is the entered value
    return this.props.check && this.props.attr[2] && this.props.attr[2] !== this.props.attr[0];
  }

  render() {
    if (this.state.revealed) return this.renderFixed();
    
    let val = " ";
    if (this.props.attr[2]) val = this.props.attr[2];
    
    if (this.props.showNotes && !this.props.attr[2]) return this.renderNotes(val);

    const incorrect = this.isIncorrect();
    let border = incorrect ? 'chk-square' : 'square';
    let text = incorrect ? 'chk-square-entered' : 'square-entered';

    if (this.props.darkmodeOn) {
      border += '-dark';
      text += '-dark';
    }

    if (this.props.size === 'small') {
      border += '-small';
      text += '-small';
    }
    
    return <div className={border} onClick={this.enterVal}>
      <h3 className={text}>{val}</h3>
    </div>
  }
}

export default Square;