import React, { useState } from 'react';
import './homePage.css';
import TopSection from '../topSection/topSection';
import BottomSection from '../bottomSection/bottomSection';

interface Product {
  id: number;
  title: string;
  description: string;
}

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const updateProducts = (newProducts: Product[]): void => {
    setProducts(newProducts);
  };

  return (
    <div className="home-page">
      <TopSection updateProducts={updateProducts} />
      <BottomSection products={products} />
    </div>
  );
};

export default HomePage;
