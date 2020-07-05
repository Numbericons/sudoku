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
    // const numbs = [1,2,3,4,5,6,7,8,9];
    // let response = prompt("Enter a number between 1 and 9:");
    // while (!numbs.includes(parseInt(response))) response = parseInt(prompt("Re-enter a number between 1 and 9:"));
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