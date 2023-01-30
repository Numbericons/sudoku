import React from "react";
import PropTypes from "prop-types";

export default class BackgroundModal extends React.Component {
  onClose = e => {
    this.props.onClose(e);
  };

  render() {
    if (!this.props.show) return null;

    return (
      <div>
        <div className='modal-backdrop' onClick={this.onClose}></div>
        <div className="modal" id="modal" >
          <h2 className='info-header'>Select a Background</h2>
          <div className="content">
            <div className='modal-background-cont'>
              <div className='modal-background-cont-inner'>
                <img className='modal-background-img' src={'bckgrnd1.webp'} alt='Info Buttons-1' 
                    value={'1'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd2.webp'} alt='Info Buttons-2' 
                    value={'2'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd3.webp'} alt='Info Buttons-3' 
                    value={'3'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd7.webp'} alt='Info Buttons-4' 
                    value={'4'} onClick={this.props.setBackground}></img>
              </div>
              <div className='modal-background-cont-inner'>
                <img className='modal-background-img' src={'bckgrnd18.webp'} alt='Info Buttons-5' 
                    value={'5'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd34.webp'} alt='Info Buttons-6' 
                    value={'6'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd37.webp'} alt='Info Buttons-7' 
                    value={'7'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd21n.webp'} alt='Info Buttons-8' 
                    value={'8'} onClick={this.props.setBackground}></img>
              </div>
              <div className='modal-background-cont-inner'>
                <img className='modal-background-img' src={'bckgrnd6.1.webp'} alt='Info Buttons-9' 
                    value={'9'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd4.webp'} alt='Info Buttons-10' 
                    value={'10'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd19.webp'} alt='Info Buttons-11' 
                    value={'11'} onClick={this.props.setBackground}></img>
                <img className='modal-background-img' src={'bckgrnd36.webp'} alt='Info Buttons-12' 
                    value={'12'} onClick={this.props.setBackground}></img>
              </div>
            </div>
          </div>
          <div className="modal-background-footer">
            <button className="toggle-button" onClick={this.onClose}>
              Close
            </button>
          </div>
      </div>
      </div>
    );
  }
}

BackgroundModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};