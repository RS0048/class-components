import { useEffect, useState, useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import './bottomSection.css';
import Product from '../../interfaces/interfaces';
import ItemDetails from '../itemDetails/itemDetails';
interface BottomSectionProps {
  products: Product[];
  search: string;
}
export const itemOnPage = 4;

const BottomSection: React.FC<BottomSectionProps> = ({ products, search }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(pageFromUrl);
  const totalPages = Math.ceil(products.length / itemOnPage);
  const selectedProductId = searchParams.get('details');

  const updatePageInUrl = useCallback(
    (newPage: number, newSearch: string) => {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('page', newPage.toString());
      if (newSearch) {
        newSearchParams.set('search', newSearch);
      }

      if (selectedProductId) {
        newSearchParams.set('details', selectedProductId);
      }
      setSearchParams(newSearchParams);
      setPage(newPage);
    },
    [setSearchParams, selectedProductId],
  );

  const handlePrevious = () => {
    updatePageInUrl(Math.max(page - 1, 1), search);
  };

  const handleNext = () => {
    updatePageInUrl(Math.min(page + 1, totalPages), search);
  };

  const handleCardClick = (product: Product) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('details', product.id.toString());
    setSearchParams(newSearchParams);
  };

  const handleAllCardsClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.product-item')) {
      setSearchParams({ page: page.toString(), search });
    }
  };

  useEffect(() => {
    updatePageInUrl(page, search);
  }, [page, search, updatePageInUrl, selectedProductId]);

  const displayedProducts = products.slice(
    (page - 1) * itemOnPage,
    page * itemOnPage,
  );

  const selectedProduct =
    products.find((product) => product.id.toString() === selectedProductId) ||
    null;

  return (
    <div data-testid="bottom-section" className="bottom-section">
      <div className="allCards" onClick={handleAllCardsClick}>
        <div className="displayedProducts">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className="product-item"
                onClick={() => handleCardClick(product)}
              >
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            ))
          ) : (
            <p className="messageWithoutCards">No products to display.</p>
          )}
        </div>

        <div className="pagination-controls">
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
      {selectedProduct && (
        <div className="product-details-container">
          <ItemDetails
            selectedProduct={selectedProduct.id}
            onClose={() => setSearchParams({ page: page.toString(), search })}
          />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default BottomSection;
