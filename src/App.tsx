import { Component } from 'react';
import './App.css';
import HomePage from './components/homePage/homePage';

class App extends Component {
  render(): JSX.Element {
    return (
      <div className="app">
        <HomePage />
      </div>
    );
  }
}

export default App;
