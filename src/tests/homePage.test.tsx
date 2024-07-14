import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import HomePage from '../pages/homePage/homePage';

describe('homePage', () => {
  it('check renders TopSection and BottomSection', () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );

    const topSection = screen.getByTestId('top-section');
    expect(topSection).toBeInTheDocument();

    const bottomSection = screen.getByTestId('bottom-section');
    expect(bottomSection).toBeInTheDocument();
  });
});
