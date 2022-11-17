import React from 'react';
import gif from './pond_wide.gif';
// import gif from 'url(https://drive.google.com/file/d/1Tu-H8HQTmlESBEkFuswPs77r6FeUUaxl)';
// './blue_lotus.gif'
// './red_pond.gif'

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
    return <div className='entry' style={{ backgroundImage: "url(backgroundImg.png)", backgroundSize: 'cover' }}>
      <div className='entry-header'>
        <div className='entry-header-text'>
          Welcome to Sudoku
        </div>
      </div>

      {/* <div className='entry-prompt'>
        Choose a difficulty 1 to 100,<br/>
          i.e. the % of hidden squares
      </div> */}
      <div className='entry-prompt'>
        Choose a difficulty between 1 and 100,<br/>
        which sets the percentage of hidden squares
      </div>
      <div className='entry-form'>
        <input className='entry-form-input' type="text" value={this.state.value} onChange={this.handleChange}/>
        <button className='entry-form-submit' onClick={this.handleClick}>
          Submit
        </button>
      </div>
      <div className='entry-animation'>
        <img src={gif} alt='loading'/>
      </div>
    </div>
  }
}

export default EntryForm;