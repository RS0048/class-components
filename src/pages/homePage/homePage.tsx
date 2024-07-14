import React, { useState } from 'react';
import styles from './homePage.module.css';
import TopSection from '../../components/topSection/topSection';
import BottomSection from '../../components/bottomSection/bottomSection';
import Product from '../../interfaces/interfaces';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');

  const updateProducts = (newProducts: Product[]): void => {
    setProducts(newProducts);
  };

  const updateSearch = (newSearch: string): void => {
    setSearch(newSearch);
  };

  return (
    <div className={styles.homePage}>
      <TopSection updateProducts={updateProducts} updateSearch={updateSearch} />
      <BottomSection products={products} search={search} />
    </div>
  );
};

export default HomePage;
