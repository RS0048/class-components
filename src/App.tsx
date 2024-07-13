import './App.css';
import HomePage from './components/homePage/homePage';
import ErrorBoundary from './components/errorBoundary/errorBoundary';


const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <HomePage />
      </div>
    </ErrorBoundary>
  );
};

export default App;
