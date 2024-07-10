import { Component, FormEvent, ChangeEvent } from 'react';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

interface SearchComponentState {
  query: string;
}

class SearchComponent extends Component<
  SearchComponentProps,
  SearchComponentState
> {
  constructor(props: SearchComponentProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Enter search"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchComponent;
