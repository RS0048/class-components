import { FormEvent, ChangeEvent, useState } from 'react';

interface SearchComponentProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(query);
    localStorage.setItem('lastSearch', query);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
