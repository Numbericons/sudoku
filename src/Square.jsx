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
    return <div className='square'>
      <h3 className='square-revealed'>
        {this.state.value}
      </h3>
    </div>
  }

  renderNotes(val) {
    return <div className='square'>
      <h3 className="square-entered" onClick={this.enterVal}>{val}</h3>
      <input className="square-input" type="text" />
    </div >
  }
 
  render() {
    if (this.state.revealed) return this.renderFixed();
    
    let val = " ";
    if (this.props.attr[2]) val = this.props.attr[2];
    
    if (this.props.showNotes && !this.props.attr[2]) return this.renderNotes(val);

    const border = this.props.check ? 'chk-square' : 'square';
    const text = this.props.check ? 'chk-square-entered' : 'square-entered';
    
    return <div className={border} onClick={this.enterVal}>
      <h3 className={text}>{val}</h3>
    </div>
  }
}

export default Square;