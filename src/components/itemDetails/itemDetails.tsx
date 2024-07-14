import React, { useEffect, useState } from 'react';
import Product from '../../interfaces/interfaces';
import './itemDetails.css';

interface ItemDetailsProps {
  selectedProduct: number;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  selectedProduct,
  onClose,
}) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${selectedProduct}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };

    fetchProduct();
  }, [selectedProduct]);

  if (!product) {
    return null;
  }

  return (
    <div className="item-details">
      {product.images && product.images.length > 0 && (
        <img
          className="itemImage"
          src={product.images[0]}
          alt={product.title}
        />
      )}
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ItemDetails;
