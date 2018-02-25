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
      <div className='Camera'>
        <div className='CameraContainer'>
          <Webcam
            audio={true}
            ref={this.setRef}
            height={this.state.vwHeight / 2}
            width={this.state.vwWidth / 2}
            screenshotFormat='image/jpeg' />

          <button className='CaptureButton' onClick={this.capture}>
            Snap!
          </button>
        </div>

        <div className='SnapshotContainer'>
          {this.state.imageSrc ?
            <img className='Snapshot' src={this.state.imageSrc} /> :
            <div />
          }

          {this.state.imageSrc && this.props.confirmHandler ?
            <button className='SnapshotConfirmButton' onClick={this.confirmSnapshot}>
              Confirm
            </button> :
            <div />
          }
        </div>
      </div>
    );
  }
}

export default Camera;
