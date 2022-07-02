import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disableBtn: true,
      // inputValue: '',
    };
  }

  render() {
    const btnCondition = 2;
    // const { inputValue, disableBtn } = this.state;
    const { disableBtn } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          onChange={ ({ target }) => this.setState({
            // inputValue: target.value,
            disableBtn: target.value.length < btnCondition,
          }) }
          type="text"
          data-testid="search-artist-input"
          name=""
          id=""
        />
        <button
          disabled={ disableBtn }
          type="button"
          data-testid="search-artist-button"
        >
          Procurar

        </button>
      </div>
    );
  }
}

export default Search;
