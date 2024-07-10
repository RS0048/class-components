import { Component } from 'react';
import './App.css';
import HomePage from './components/homePage/homePage';

class App extends Component {
  render(): React.ReactNode {
    return (
      <div className="app">
        <HomePage />
      </div>
    );
  }
}

export default App;
