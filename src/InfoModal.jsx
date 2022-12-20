import React from "react";
import PropTypes from "prop-types";

export default class InfoModal extends React.Component {
  onClose = e => {
    this.props.onClose(e);
  };

  render() {
    if (!this.props.show) return null;

    return (
      <div className="modal" id="modal">
        <h2 className='info-header'>Information</h2>
        <div className="content">
          <div className='info-container'>
            <img className='info-image' src={'Information_on_icons.png'} alt='Info Buttons'></img>
            <div className='info-text'>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-file-text-o"></i>}</h1>
                </div>
                <h3 className='info-line-text-bold'>Notes:</h3>
                <h3 className='info-line-text'>Toggles showing text inputs in empty cells</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-refresh"></i>}</h1>
                </div>
                <h3 className='info-line-text-bold'>Refresh:</h3>
                <h3 className='info-line-text'>Refreshes the current page</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-check-square-o"></i>}</h1>
                </div>
                <h3 className='info-line-text-bold'>Check square:</h3>
                <h3 className='info-line-text'>Highlights cells with incorrect numbers red</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>B1</h1>
                </div>
                <h3 className='info-line-text-bold'>B1 to B6:</h3>
                <h3 className='info-line-text'>Selects custom backgrounds</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>1</h1>
                </div>
                <h3 className='info-line-text-bold'>1 to 9:</h3>
                <h3 className='info-line-text'>Selects numbers to enter into cells</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-eraser"></i>}</h1>
                </div>
                <h3 className='info-line-text-bold'>Eraser:</h3>
                <h3 className='info-line-text'>Removes numbers from cells</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="toggle-button" onClick={this.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};