import './itemDetails.css';
import productsApi from '../../api/productsApi';

interface ItemDetailsProps {
  selectedProduct: number;
  onClose: () => void;
}

const { useGetProductByIdQuery } = productsApi;

const ItemDetails: React.FC<ItemDetailsProps> = ({
  selectedProduct,
  onClose,
}) => {
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(selectedProduct);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Ошибка при загрузке товара:', error);
    return <p>Ошибка при загрузке товара.</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="item-details">
      {isLoading && <div className="loader">Loading...</div>}
      {product.images && product.images.length > 0 && (
        <img
          data-testid="item-image"
          className="itemImage"
          src={product.images[0]}
          alt={product.title}
        />
      )}
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ItemDetails;
