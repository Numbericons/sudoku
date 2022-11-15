import React from 'react';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '50'};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    this.props.setDifficulty(event, this.state.value);
  }

  render() {
    return <div className='entry'>
      <div className='entry-header'>
        <div className='entry-header-text'>
          Welcome to Sudoku!
        </div>
      </div>
      <div className='entry-prompt'>
        Choose a difficulty between 1 and 100<br/>
        which sets the percentage of squares to hide
      </div>
      <div className='entry-form'>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>
          Submit
        </button>
      </div>
    </div>
  }
}

export default EntryForm;