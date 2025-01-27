import { Component, ReactNode } from 'react';
import Search from './components/search/Search';
import './App.css';
import CardList from './components/cardList/CardList';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Search />
        <CardList />
      </>
    );
  }
}

export default App;
