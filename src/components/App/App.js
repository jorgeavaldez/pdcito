import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import './App.css';

import { Camera, FilterBuilder } from '../';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  setImage = (imageSrc) => {
    this.setState({ image: imageSrc });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={props => (
            <Camera confirmHandler={this.setImage} {...props} />
          )} />

          <Route path="/filter" render={props => (
            this.state.image ?
              <FilterBuilder image={this.state.image} {...props} /> :
              <Redirect to="/" />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
