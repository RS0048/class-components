import { useEffect, useState } from 'react';
import './topSection.css';
import SearchComponent from '../searchComponent/searchComponent';
import BugComponent from '../BugComponent/BugComponent';

interface Product {
  id: number;
  title: string;
  description: string;
}

interface TopSectionProps {
  updateProducts: (products: Product[]) => void;

}

const TopSection: React.FC<TopSectionProps> = ({ updateProducts }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBugComponent, setShowBugComponent] = useState<boolean>(false);

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    handleSearch(lastSearch);
  }, []);

  const handleSearch = (query: string): void => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        updateProducts(data.products);
      })
      .catch((error) => {
        console.error('Ошибка при поиске продуктов:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleShowBugComponent = (): void => {
    setShowBugComponent(true);
  };

  return (
    <div className="top-section">
      <SearchComponent onSearch={handleSearch} />
      {isLoading && <div className="loader">Loading...</div>}
      <button onClick={handleShowBugComponent}>Go error</button>
      {showBugComponent && <BugComponent />}
    </div>
  );
};
export default TopSection;
