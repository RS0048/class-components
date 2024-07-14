import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/notFoundPage/notFoundPage';
import '@testing-library/jest-dom';

describe('NotFoundPage', () => {
  it('check message "Page not found" for unknown pages', async () => {
    render(
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>,
    );

    const pageNotFoundElement = screen.queryByText('Page not found');
    expect(pageNotFoundElement).toBeInTheDocument();
  });
});
