import { Component } from 'react';
import './App.css';
import HomePage from './components/homePage/homePage';
import ErrorBoundary from './components/errorBoundary/errorBoundary';

class App extends Component {
  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <div className="app">
          <HomePage />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
