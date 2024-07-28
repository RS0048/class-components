import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import HomePage from '../pages/homePage/homePage';
import { Provider } from 'react-redux';
import store from '../store';

describe('homePage', () => {
  it('check renders TopSection and BottomSection', () => {
    render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>,
    );

    const topSection = screen.getByTestId('top-section');
    expect(topSection).toBeInTheDocument();

    const bottomSection = screen.getByTestId('bottom-section');
    expect(bottomSection).toBeInTheDocument();
  });
});
