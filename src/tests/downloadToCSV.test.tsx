import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import DownloadButton from '../components/downloadToCSV/downloadToCSV';
import { RootState } from '../store';
import { vi } from 'vitest';

const mockStore = configureMockStore<RootState>([]);

const initialState: RootState = {
  products: {
    items: [{ id: 1, title: 'Product 1', description: 'Desc 1', price: '100' }],
  },
  selectedProducts: { selectedProductIds: [1] },
};

describe('DownloadButton', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('check button download', () => {
    render(
      <Provider store={store}>
        <DownloadButton />
      </Provider>,
    );
    expect(screen.getByText('Download CSV')).toBeInTheDocument();
  });

  it('check selects correct products', () => {
    render(
      <Provider store={store}>
        <DownloadButton />
      </Provider>,
    );

    const products = initialState.products.items.filter((product) =>
      initialState.selectedProducts.selectedProductIds.includes(product.id),
    );

    expect(products.length).toBe(1);
    expect(products[0].title).toBe('Product 1');
  });

  it('check generates and downloads CSV file', () => {
    const createObjectURLMock = vi.fn(() => 'mocked-url');
    const revokeObjectURLMock = vi.fn();

    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    render(
      <Provider store={store}>
        <DownloadButton />
      </Provider>,
    );

    const button = screen.getByText('Download CSV');
    fireEvent.click(button);

    expect(createObjectURLMock).toHaveBeenCalledTimes(1);

    const expectedCSV =
      '"id","title","description","price"\n"1","Product 1","Desc 1","100"';
    const blob = new Blob([expectedCSV], { type: 'text/csv' });

    expect(createObjectURLMock).toHaveBeenCalledWith(blob);

    const link = document.createElement('a');
    link.href = 'mocked-url';
    link.download = '1_products.csv';

    expect(link.href).toContain('mocked-url');
    expect(link.download).toBe('1_products.csv');

    URL.revokeObjectURL('mocked-url');
    expect(revokeObjectURLMock).toHaveBeenCalledWith('mocked-url');
  });
});
