import React from 'react';
// import logo from './logo.svg';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.attr[0],
      revealed: props.attr[1],
      entered: null
    }
    this.enterVal = this.enterVal.bind(this);
  }

  enterVal() {
    if (this.props.selected && !this.state.revealed) this.setState({entered: this.props.selected});
  }

  render() {
    let val = this.state.revealed ? this.state.value : "";
    if (this.state.entered) val = this.state.entered;
    let textClass = this.state.revealed ? 'square-revealed' : 'square-entered';
    
    return <div className='square' onClick={this.enterVal}>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <h3 className={textClass}>
        {val}
      </h3>
    </div>
  }
}

export default Square;