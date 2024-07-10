import { Component } from 'react';
import './topSection.css';
import SearchComponent from '../searchComponent/searchComponent';

interface Product {
  id: number;
  title: string;
  description: string;
}

interface TopSectionProps {
  updateProducts: (products: Product[]) => void;
}

class TopSection extends Component<TopSectionProps> {
  componentDidMount(): void {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) this.handleSearch(lastSearch);
  }
  handleSearch = (query: string): void => {
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.updateProducts(data.products);
      })
      .catch((error) => {
        console.error('Ошибка при поиске продуктов:', error);
      });
  };

  render(): React.ReactNode {
    return (
      <div className="top-section">
        <SearchComponent onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default TopSection;
