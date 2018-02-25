import React, { Component } from 'react';
import { createTuna, createTunaFilter } from '../../lib';

import './NoiseyBoy.css';

let audioContext;
let streamSource;
let tuna;

class NoiseyBoy extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { filter, filterType } = this.props;

    audioContext = new AudioContext();
    tuna = createTuna(audioContext);

    navigator.getUserMedia({audio: true, video: false},
      (mediaStream) => {
        const tunaFilter = createTunaFilter(tuna, filterType, filter);
        streamSource = audioContext.createMediaStreamSource(mediaStream);
        streamSource.connect(tunaFilter);
        tunaFilter.connect(audioContext.destination);
      },
      (err) => {
        console.log('you fucked up');
      });

    this.setState({ audioContext });
  }

  startRecording = () => {
  }

  render() {
    return (
      <div className="NoiseyBoyContainer">
      </div>
    );
  }
}

export default NoiseyBoy;
