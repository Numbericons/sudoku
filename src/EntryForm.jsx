import React, {useEffect} from 'react';
import gif from './pond_wide_small.gif';

// class EntryForm extends React.Component {
const EntryForm = ({ setDifficulty, hideLoader } ) => {
  useEffect(hideLoader, []);
  // constructor(props) {
  //   super(props);
  //   // this.state = { 
  //   //   // difficulty: 'medium',
  //   //   isLoading: true
  //   // };

  // }
  // this.handleClick = this.handleClick.bind(this);
  
  const handleClick = (event) => {
    const value = event.target.attributes.value.value;
    setDifficulty(event, value);
    // this.props.setDifficulty(event, value);
  }

  // componentDidMount() {
  //   this.demoAsyncCall().then(() => {
  //     this.setState({ isLoading: false })
  //   });
  // }

  // demoAsyncCall() {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 0));
  // }

  // return {
    // if (this.state.isLoading) {
    //   return <div></div>
    // }

    return <div className='entry' style={{ backgroundImage: "url(background1.webp)", backgroundSize: 'cover' }}>
      <div className='entry-header'>
        <h4 className='entry-header-text'>Sudoku</h4>
      </div>
      <div className='entry-radio-container'>
        <div></div>
        <div className='entry-radio-form'>
          <div className='entry-prompt'>
            Set Difficulty<br />
             Hidden %
          </div>
          <button className='entry-radio-button' onClick={handleClick} value={40}>
            EASY - 40%
          </button>
          <button className='entry-radio-button' onClick={handleClick} value={50}>
            MEDIUM - 50%
          </button>
          <button className='entry-radio-button' onClick={handleClick} value={60}>
            HARD - 60%
          </button>
        </div>
        <div></div>
      </div>
      <div className='entry-animation'>
        <img className='entry-animation-image' src={gif} alt='loading'/>
      </div>
    </div>
  // }
}

export default EntryForm;