import PropTypes from 'prop-types';
import { Component } from 'react';
import { SearchIcon } from './svg';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <SearchIcon />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="search"
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
