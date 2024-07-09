import { Component } from 'react';
import './homePage.css';
import TopSection from '../topSection/topSection';
import BottomSection from '../bottomSection/bottomSection';

interface Product {
  id: number;
  title: string;
  description: string;
}

interface HomePageState {
  products: Product[];
}

interface HomePageProps {}

class HomePage extends Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      products: [],
    };
  }

  updateProducts = (products: Product[]): void => {
    this.setState({ products });
  };
  render(): JSX.Element {
    return (
      <div className="home-page">
        <TopSection updateProducts={this.updateProducts} />
        <BottomSection products={this.state.products} />
      </div>
    );
  }
}

export default HomePage;
