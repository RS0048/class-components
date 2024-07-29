import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BottomSection from '../components/bottomSection/bottomSection';
import Product from '../interfaces/interfaces';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { itemOnPage } from '../components/bottomSection/bottomSection';
import { Provider } from 'react-redux';
import store from '../store';

const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: '100',
    images: ['image1.jpg', 'image2.jpg'],
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
    price: '150',
    images: ['image3.jpg'],
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'Description 3',
    price: '40',
    images: ['image4.jpg'],
  },
  {
    id: 4,
    title: 'Product 4',
    description: 'Description 4',
    price: '80',
    images: ['image5.jpg'],
  },
  {
    id: 5,
    title: 'Product 5',
    description: 'Description 5',
    price: '30',
    images: ['image6.jpg'],
  },
];

const nullProducts: Product[] = [];

const search = '';

describe('BottomSection', () => {
  it('check correctly renders products', () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomSection products={products} search={search} />
        </Router>
      </Provider>,
    );

    products.slice(0, 4).forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('check correct number of product cards', () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomSection products={products} search={search} />
        </Router>
      </Provider>,
    );

    const productCards = document.getElementsByClassName('product-item');
    expect(productCards.length).toBe(itemOnPage);
  });

  it('check message without cards', () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomSection products={nullProducts} search={search} />
        </Router>
      </Provider>,
    );

    const messageElement = screen.getByText('No products to display.');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('messageWithoutCards');
  });

  it('check click correctly to card ', () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomSection products={products} search={search} />
        </Router>
      </Provider>,
    );

    const firstProduct = products[0];
    const productCard = screen.getByText(firstProduct.title);

    expect(productCard).toBeInTheDocument();

    const productItem = productCard.closest('.product-item');

    expect(productItem).toBeInTheDocument();

    fireEvent.click(productItem!);

    expect(window.location.href).toContain(`details=${firstProduct.id}`);
  });

  it('check pagination', async () => {
    render(
      <Provider store={store}>
        <Router>
          <BottomSection products={products} search={search} />
        </Router>
      </Provider>,
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Product 5')).toBeInTheDocument();
    });
  });
});
