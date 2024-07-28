import React, { useEffect } from 'react';
import { useTheme } from '../../themeContext';

const ThemeToggleButton: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkTheme');
    if (savedTheme !== null) {
      if (savedTheme !== String(isDarkTheme)) {
        toggleTheme();
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkTheme', String(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <button onClick={toggleTheme}>
      {isDarkTheme ? 'Light theme' : 'Dark theme'}
    </button>
  );
};

export default ThemeToggleButton;
