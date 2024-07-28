import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Router from '../router/router';

vi.mock('../pages/notFoundPage/notFoundPage', () => ({
  __esModule: true,
  default: () => <div>Not Found Page</div>,
}));

vi.mock('../pages/homePage/homePage', () => ({
  __esModule: true,
  default: () => <div>Home Page</div>,
}));

describe('Router', () => {
  it('check renders HomePage when navigating to /product', () => {
    render(
      <MemoryRouter initialEntries={['/product']}>
        <Router />
      </MemoryRouter>,
    );
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('check redirects to /product from path /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>,
    );
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('check renders NotFoundPage for unknown pages', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Router />
      </MemoryRouter>,
    );
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
