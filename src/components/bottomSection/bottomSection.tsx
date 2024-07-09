import './bottomSection.css';

interface Product {
  id: number;
  title: string;
  description: string;
}

interface BottomSectionProps {
  products: Product[];
}

const BottomSection: React.FC<BottomSectionProps> = ({ products }) => {
  return (
    <div className="bottom-section">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))
      ) : (
        <p>No products to display.</p>
      )}
    </div>
  );
};

export default BottomSection;
