import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <div className="HomeContainer">
        <div className="HomeText">
          <span className="HomeTitle">Pdcito</span>

          <div className="HomeDescriptionContainer">
            <div className="EmojiContainer">
              <span className="HomeSubText">📷</span>
              <span className="HomeSubText">🔊</span>
              <span className="HomeSubText">🦄</span>
              <span className="HomeSubText">💸</span>
            </div>

            <div className="SubTextContainer">
              <span className="HomeSubText">take a selfie</span>
              <span className="HomeSubText">turn it into an audio filter</span>
              <span className="HomeSubText">???</span>
              <span className="HomeSubText">profit</span>
            </div>
          </div>


          <div className="HomeGoButton">
            <Link className="HomeGoLink" to="/camera">
              why not? it's free!
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
