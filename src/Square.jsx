import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.attr[0],
      revealed: props.attr[1],
      entered: props.attr[2],
      notes: props.notes
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
        {/* <input className="square-input" type="text" /> */}
    </div>
  }

  renderNotes(val) {
    debugger;
    return <div className='square' onClick={this.enterVal}>
      <h3 className="square-entered">{val}</h3>
      <input className="square-input" type="text" />
    </div >
  }
 
  render() {
    if (this.state.revealed) return this.renderFixed();
    
    let val = " ";
    if (this.props.attr[2]) val = this.props.attr[2];

    if (this.state.notes) return this.renderNotes(val);
    
    return <div className='square' onClick={this.enterVal}>
      <h3 className="square-entered">{val}</h3>
    </div>
  }
}

export default Square;