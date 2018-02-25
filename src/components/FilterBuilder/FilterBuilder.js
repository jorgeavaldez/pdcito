import React, { Component } from 'react';

import './FilterBuilder.css';

import {
  getImageComponents,
  getFilterFrame,
  constructFilter,
  FILTER_TYPES
} from '../../lib';

const FilterTypeField = ({ value, onChange }) => (
  <select value={value} onChange={onChange}>
    {
      FILTER_TYPES.map(f => {
        return <option key={f} value={f}>{f}</option>
      })
    }
  </select>
);

class FilterBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePalette: null,
      filterParams: {
        type: 'Chorus'
      }
    };
  }

  componentDidMount() {
    getImageComponents(this.props.image).then(palette => {
      this.setState({ imagePalette: palette });
    });
  }

  filterTypeHandler = (e) => {
    const { filterParams } = this.state;
    filterParams.type = e.target.value;
    this.setState({ filterParams });
  };

  render() {
    if (this.state.imagePalette) {
      return (
        <form className="FilterBuilderForm">
          <label>
            Filter Type:
            <FilterTypeField
              value={this.state.filterParams.type}
              onChange={this.filterTypeHandler} />
          </label>
        </form>
      );
    }

    return (
      <h1>Loading palette...</h1>
    );
  }
}

export default FilterBuilder;
