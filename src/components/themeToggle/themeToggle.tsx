import React from 'react';
import { useTheme } from '../../themeContext';

const ThemeToggleButton: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDarkTheme ? 'Light theme' : 'Dark theme'}
    </button>
  );
};

export default ThemeToggleButton;
