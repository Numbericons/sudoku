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
                <h3 className='info-line-text'>Notes button - Toggles showing text inputs in each empty cell</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-refresh"></i>}</h1>
                </div>
                <h3 className='info-line-text'>Refresh button - Refreshes the current page</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-check-square-o"></i>}</h1>
                </div>
                <h3 className='info-line-text'>Check square button - Highlights cells with incorrect numbers in red</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>B1</h1>
                </div>
                <h3 className='info-line-text'>B1 to B6 buttons - Selects custom backgrounds</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>1</h1>
                </div>
                <h3 className='info-line-text'>1 to 9 buttons - Selects numbers to enter into cells</h3>
              </div>
              <div className='info-line'>
                <div className='number'>
                  <h1 className='number-text'>{<i className="fa fa-eraser"></i>}</h1>
                </div>
                <h3 className='info-line-text'>Eraser button - Removes a number from cells</h3>
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