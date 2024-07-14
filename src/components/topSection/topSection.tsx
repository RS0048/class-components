import { useEffect, useState, useCallback } from 'react';
import './topSection.css';
import SearchComponent from '../searchComponent/searchComponent';
import BugComponent from '../BugComponent/BugComponent';
import Product from '../../interfaces/interfaces';

interface TopSectionProps {
  updateProducts: (products: Product[]) => void;

  updateSearch: (search: string) => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  updateProducts,
  updateSearch,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBugComponent, setShowBugComponent] = useState<boolean>(false);

  const handleSearch = useCallback(
    (query: string): void => {
      setIsLoading(true);
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          updateProducts(data.products);
          updateSearch(query);
        })
        .catch((error) => {
          console.error('Ошибка при поиске продуктов:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [updateProducts, updateSearch],
  );

  const handleShowBugComponent = (): void => {
    setShowBugComponent(true);
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    handleSearch(lastSearch);
  }, []);

  return (
    <div data-testid="top-section" className="top-section">
      <SearchComponent onSearch={handleSearch} />
      {isLoading && <div className="loader">Loading...</div>}
      <button onClick={handleShowBugComponent}>Go error</button>
      {showBugComponent && <BugComponent />}
    </div>
  );
};
export default TopSection;
