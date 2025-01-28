import { Component, ReactNode } from 'react';

class Search extends Component<
  { onSearch: (query: string) => void },
  { query: string }
> {
  state = {
    query: localStorage.getItem('searchQuery') || '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  render(): ReactNode {
    return (
      <>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </>
    );
  }
}

export default Search;
