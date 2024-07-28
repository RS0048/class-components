import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemDetails from '../components/itemDetails/itemDetails';
import { Provider } from 'react-redux';
import store from '../store';

describe('itemDetails', () => {
  it('check renders and closes on button click', async () => {
    const selectedProduct = 1;

    render(
      <Provider store={store}>
        <ItemDetails selectedProduct={selectedProduct} onClose={() => {}} />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    const itemImageElement = await screen.findByTestId('item-image');
    expect(itemImageElement).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const itemImageAfterClose = screen.queryByTestId('item-image');
      expect(itemImageAfterClose).toBeInTheDocument();
    });
  });
});
