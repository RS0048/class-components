import { useEffect, useState, useCallback } from 'react';
import './topSection.css';
import SearchComponent from '../searchComponent/searchComponent';
import BugComponent from '../BugComponent/BugComponent';
import Product from '../../interfaces/interfaces';
import productsApi from '../../api/productsApi';
import ThemeToggleButton from '../themeToggle/themeToggle';

interface TopSectionProps {
  updateProducts: (products: Product[]) => void;

  updateSearch: (search: string) => void;
}

const { useSearchProductsQuery } = productsApi;

const TopSection: React.FC<TopSectionProps> = ({
  updateProducts,
  updateSearch,
}) => {
  const [showBugComponent, setShowBugComponent] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    localStorage.getItem('lastSearch') || '',
  );
  const { data, isLoading } = useSearchProductsQuery(searchQuery);

  useEffect(() => {
    if (data) {
      updateProducts(data.products);
      updateSearch(searchQuery);
    }
  }, [data, updateProducts, updateSearch, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    localStorage.setItem('lastSearch', query);
  }, []);

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
      <ThemeToggleButton />
    </div>
  );
};
export default TopSection;
