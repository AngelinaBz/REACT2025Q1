import { Component, ReactNode } from 'react';
import Search from './components/search/Search';
import CardList from './components/cardList/CardList';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import './App.css';
import ErrorMessage from './components/errorBoundary/ErrorMessage';

export interface State {
  query: string;
  hasError: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: localStorage.getItem('searchQuery') || '',
      hasError: false,
    };
  }

  handleSearch = (query: string) => {
    this.setState({ query });
  };

  handleError = () => {
    try {
      throw new Error('Testing Error');
    } catch (error) {
      this.setState({ hasError: true });
      console.error('Error caught in ErrorBoundary: ', error);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return (
      <ErrorBoundary>
        <Search onSearch={this.handleSearch} onError={this.handleError} />
        <CardList query={this.state.query} />
      </ErrorBoundary>
    );
  }
}

export default App;
