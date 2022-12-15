import React from 'react';
import gif from './pond_wide.gif';

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '50', difficulty: 'medium'};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick(event) {
    this.props.setDifficulty(event, this.state.value);
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  handleDifficultySubmit(event) {
    this.props.setDifficulty(event, this.state.value);
  }

  render() {
    return <div className='entry' style={{ backgroundImage: "url(midjourney3.png)", backgroundSize: 'cover' }}>
      <div className='entry-header'>
        <div className='entry-header-text'>
          Sudoku
        </div>
      </div>
      <div className='entry-radio-container'>
        <div></div>
        <div className='entry-radio-form'>
          <div className='entry-prompt'>
            Difficulty<br/>
            (% hidden cells)
          </div>
          <div className='entry-radio-text-container'>
            <label className='entry-radio-text'>Easy (40%)</label>
            <input name="difficulty"
              type="radio"
              className="entry-radio-input"
              value="40"
              checked={this.state.value === '40'}
              onChange={this.handleInputChange} 
              />
          </div>
          <div className='entry-radio-text-container'>
            <label className='entry-radio-text'>Medium (50%)</label>
            <input
              name="difficulty"
              type="radio"
              className="entry-radio-input"
              value='50'
              checked={this.state.value === '50'}
              onChange={this.handleInputChange} 
              />
          </div>
          <div className='entry-radio-text-container'>
            <label className='entry-radio-text'>Hard (60%)</label>
            <input
              name="difficulty"
              type="radio"
              className="entry-radio-input"
              value='60'
              checked={this.state.value === '60'}
              onChange={this.handleInputChange} 
            />
          </div>
          <div className='entry-radio-text-container'>
            <label className='entry-radio-text'>Very Hard (65%)</label>
            <input
              name="difficulty"
              type="radio"
              className="entry-radio-input"
              value='65'
              checked={this.state.value === '65'}
              onChange={this.handleInputChange} 
            />
          </div>
          <div className='entry-radio-text-container'>
            <label className='entry-radio-text'>Custom (%) </label>
            <input className='entry-form-input' type="text" onChange={this.handleChange} />
          </div>
          <div>
            <button className='entry-form-submit' onClick={this.handleClick}>
              Play
            </button>
          </div>
        </div>
        <div></div>
      </div>
      <div className='entry-animation'>
        <img className='entry-animation-image' src={gif} alt='loading'/>
      </div>
    </div>
  }
}

export default EntryForm;