import { Component } from 'react';
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

interface TopSectionState {
  isLoading: boolean;
  showBugComponent: boolean;
}

class TopSection extends Component<TopSectionProps, TopSectionState> {
  constructor(props: TopSectionProps) {
    super(props);
    this.state = {
      isLoading: false,
      showBugComponent: false,
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

  handleShowBugComponent = (): void => {
    this.setState({ showBugComponent: true });
  };

  render(): React.ReactNode {
    return (
      <div className="top-section">
        <SearchComponent onSearch={this.handleSearch} />
        {this.state.isLoading && <div className="loader">Loading...</div>}
        <button onClick={this.handleShowBugComponent}>Go error</button>
        {this.state.showBugComponent && <BugComponent />}
      </div>
    );
  }
}

export default TopSection;
