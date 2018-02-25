import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Webcam from 'react-webcam';

import './Camera.css';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      vwWidth: 0,
      vwHeight: 0,
      redirect: false
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      vwWidth: window.innerWidth,
      vwHeight: window.innerHeight
    });
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = (e) => {
    e.preventDefault();

    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc: imageSrc });
  };

  confirmSnapshot = (e) => {
    e.preventDefault();
    this.props.confirmHandler(this.state.imageSrc);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to='/filter' />;
    }

    return (
      <div className='CameraAlignmentContainer'>
        <div className='Camera'>
          <div className='CameraContainer' onClick={this.capture}>
            <Webcam
              className="Webcam"
              audio={false}
              ref={this.setRef}
              screenshotFormat='image/jpeg' />

            {
              !this.state.imageSrc ?
              <span className="CameraMessageBox">Tap your face to take a picture!</span> :
              <span className="CameraMessageBox">Tap again to take another one 🗝️</span>
            }
          </div>

          {
            this.state.imageSrc ?
            <div className='SnapshotContainer' onClick={this.confirmSnapshot}>
              {this.state.imageSrc ?
                <img className='Snapshot' src={this.state.imageSrc} alt="lookin good ;)" /> :
                <div />
              }
              <span className="CameraMessageBox">... Or tap the still to move on!</span>
            </div> : null
          }
        </div>
      </div>
    );
  }
}

export default Camera;
