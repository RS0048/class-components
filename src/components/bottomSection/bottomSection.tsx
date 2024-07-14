import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import './bottomSection.css';

interface Product {
  id: number;
  title: string;
  description: string;
}

interface BottomSectionProps {
  products: Product[];
  search: string;
}

const BottomSection: React.FC<BottomSectionProps> = ({ products, search }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState(pageFromUrl);
  const itemOnPage = 4;
  const totalPages = Math.ceil(products.length / itemOnPage);

  const updatePageInUrl = useCallback(
    (newPage: number, newSearch: string) => {
      console.log('newSearch', newSearch);
      newSearch === ''
        ? setSearchParams({ page: newPage.toString() })
        : setSearchParams({ page: newPage.toString(), search: newSearch });
      setPage(newPage);
    },
    [setSearchParams],
  );

  const handlePrevious = () => {
    updatePageInUrl(Math.max(page - 1, 1), search);
  };

  const handleNext = () => {
    updatePageInUrl(Math.min(page + 1, totalPages), search);
  };

  useEffect(() => {
    updatePageInUrl(page, search);
  }, [page, search, updatePageInUrl]);

  const displayedProducts = products.slice(
    (page - 1) * itemOnPage,
    page * itemOnPage,
  );

  return (
    <div className="bottom-section">
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No products to display.</p>
      )}
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
  );
};

export default BottomSection;
