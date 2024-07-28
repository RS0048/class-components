import { useEffect } from 'react';
import './App.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import Router from './router/router';
import { useTheme } from './themeContext';

const App: React.FC = () => {
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
  }, [isDarkTheme]);

  return (
    <ErrorBoundary>
      <div className={`${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Router />
      </div>
    </ErrorBoundary>
  );
};

export default App;
