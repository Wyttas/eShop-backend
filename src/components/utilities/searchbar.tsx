import React from 'react';
import Image from 'next/image';

// Define props interface
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update parent's state
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add search logic here if needed, e.g., trigger a search API call
    console.log('Search submitted:', searchQuery);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="search-input">Search: </label>
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search products..."
        />
      </form>

      <Image
        src="/images/search.gif"
        alt="Search icon"
        width={32}
        height={32}
        priority // Optional: Load the image eagerly if it's above the fold
      />
    </div>
  );
};

export default SearchBar;