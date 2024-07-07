import { Component } from 'react';
import './homePage.css';
import TopSection from '../topSection/topSection';
import BottomSection from '../bottomSection/bottomSection';

class HomePage extends Component {
  render(): JSX.Element {
    return (
      <div className="home-page">
        <TopSection />
        <BottomSection />
      </div>
    );
  }
}

export default HomePage;
