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

interface TopSectionState {
  isLoading: boolean;
}

class TopSection extends Component<TopSectionProps, TopSectionState> {
  constructor(props: TopSectionProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount(): void {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    this.handleSearch(lastSearch);
  }
  handleSearch = (query: string): void => {
    this.setState({ isLoading: true });
    fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        this.props.updateProducts(data.products);
      })
      .catch((error) => {
        console.error('Ошибка при поиске продуктов:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render(): React.ReactNode {
    return (
      <div className="top-section">
        <SearchComponent onSearch={this.handleSearch} />
        {this.state.isLoading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}

export default TopSection;
