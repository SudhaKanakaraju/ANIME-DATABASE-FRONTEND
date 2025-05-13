import React, { useState } from 'react';
import { useGlobalContext } from '../context/global';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { searchAnime } = useGlobalContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchAnime(query);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={!query.trim()}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;