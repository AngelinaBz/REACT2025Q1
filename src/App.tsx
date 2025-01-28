import { Component, ReactNode } from 'react';
import Search from './components/search/Search';
import CardList from './components/cardList/CardList';
import './App.css';

class App extends Component {
  state = {
    query: localStorage.getItem('searchQuery') || '',
  };

  handleSearch = (query: string) => {
    this.setState({ query });
  };

  render(): ReactNode {
    return (
      <>
        <Search onSearch={this.handleSearch} />
        <CardList query={this.state.query} />
      </>
    );
  }
}

export default App;
