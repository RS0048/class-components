import './App.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Router from './router/router';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
