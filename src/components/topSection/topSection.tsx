import { Component } from 'react';
import './topSection.css';
import SearchComponent from '../searchComponent/searchComponent';

console.log('test');
class TopSection extends Component {
  handleSearch = (query: string): void => {
    console.log('Обработка поискового запроса в TopSection:', query);
  };

  render(): JSX.Element {
    return (
      <div className="top-section">
        <SearchComponent onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default TopSection;
