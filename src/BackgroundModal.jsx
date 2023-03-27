import React, { useState } from 'react';

import PropTypes from "prop-types";
import Background from "./Background.jsx";

export default class BackgroundModal extends React.Component {
  onClose = e => {
    this.props.onClose(e);
  };

  createBackgrounds() {
    let backgrounds = [];
    let counter = 1;

    for (let i=0; i<3; i++){

      for (let k=0; k<5; k++){
        backgrounds.push(
          <Background value={counter} key={counter} clickProp={this.props.setBackground}></Background>
        );

        counter += 1;
      }
    }

    return backgrounds;
  }

  render() {
    if (!this.props.show) return null;

    const backgroundArr = this.createBackgrounds();

    return (
      <div>
        <div className='modal-backdrop' onClick={this.onClose}></div>
        <div className="modal" id="background-modal" >
          <h2 className='info-header'>Select a Background</h2>
          <div className="content">
            <div className='modal-background-cont'>
              <div className='modal-background-cont-inner'>
                {backgroundArr.slice(0,5)}
              </div>
              <div className='modal-background-cont-inner'>
                {backgroundArr.slice(5,10)}
              </div>
              <div className='modal-background-cont-inner'>
                {backgroundArr.slice(10,15)}
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