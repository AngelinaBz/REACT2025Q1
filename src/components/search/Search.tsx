import { Component, ReactNode } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  onError: () => void;
}

interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: localStorage.getItem('searchQuery') || '',
    };
    this.handleError = this.handleError.bind(this);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const trimmedQuery = this.state.query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  handleError = () => {
    this.props.onError();
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
        <button onClick={this.handleError}>Throw Error</button>
      </>
    );
  }
}

export default Search;
