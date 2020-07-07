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

  render() {
    let val = this.state.revealed ? this.state.value : "";
    if (this.props.attr[2]) val = this.props.attr[2];
    let textClass = this.state.revealed ? 'square-revealed' : 'square-entered';
    
    return <div className='square' onClick={this.enterVal}>
      <h3 className={textClass}>
        {val}
      </h3>
    </div>
  }
}

export default Square;