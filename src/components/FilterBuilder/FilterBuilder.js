import React, { Component } from 'react';

import './FilterBuilder.css';

import { NoiseyBoy } from '../';
import {
  getImageComponents,
  getFilterFrame,
  constructFilter,
  FILTER_TYPES
} from '../../lib';

const FilterTypeField = ({ value, onChange }) => (
  <select className="FilterField" value={value} onChange={onChange}>
    {
      FILTER_TYPES.map(f => {
        return <option key={f} value={f}>{f}</option>
      })
    }
  </select>
);

const FilterBody = ({ filter }) => (
  <div className="FilterBody">
    <pre>
      { JSON.stringify(filter, null, 2) }
    </pre>
  </div>
);

class FilterBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePalette: null,
      filterParams: {
        type: 'Chorus'
      },
      filter: null
    };
  }

  componentDidMount() {
    getImageComponents(this.props.image).then(palette => {
      // remove null palettes
      const paletteTypes = Object.keys(palette).reduce((acc, k) => {
        if (palette[k]) return [...acc, k];
        else return acc;
      }, []);

      const cleanPalette = {};
      paletteTypes.forEach(p => cleanPalette[p] = palette[p]);

      this.setState({ imagePalette: cleanPalette });
    });
  }

  filterTypeHandler = (e) => {
    const { filterParams } = this.state;
    filterParams.type = e.target.value;
    this.setState({ filterParams });
  };

  buildFilter = (e) => {
    e.preventDefault();

    const filterType = this.state.filterParams.type;
    const filterFrame = getFilterFrame(filterType);
    const filterBody = constructFilter(filterFrame, this.state.imagePalette);

    this.setState({ filter: filterBody });
  };

  render() {
    if (this.state.imagePalette) {
      return (
        <div className="FilterBuilderContainer">
          <div className="FilterBuilderBody">
            <form className="FilterBuilderForm" onSubmit={this.buildFilter}>
              <label>
                <span className="FilterFormLabel">Choose a Filter Type</span>
                <FilterTypeField
                  value={this.state.filterParams.type}
                  onChange={this.filterTypeHandler} />
              </label>
              <input className="FilterFormSubmit" type="submit" value="Noise Me" />
            </form>

            {this.state.filter ?
              <FilterBody filter={this.state.filter} /> :
              null
            }
          </div>

          {this.state.filter ?
            <NoiseyBoy
              filter={this.state.filter}
              filterType={this.state.filterParams.type} /> :
            null
          }
        </div>
      );
    }

    return (
      <h1>Loading palette...</h1>
    );
  }
}

export default FilterBuilder;
