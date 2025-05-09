import Image from 'next/image';


const SearchBar = ({ searchQuery, setSearchQuery }) => {



    const handleInputChange = (event) => {
        setSearchQuery(event.target.value); // Update App's state directly
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="searchbar">
            <form onSubmit={handleSearchSubmit}>
                <label>Search:&nbsp;</label>
                <input
                    type="text"
                    value={searchQuery} // Controlled by App's state
                    onChange={handleInputChange} // Update the parent state
                />
            </form>

            <Image
        src="/images/search.gif"
        alt="Search"
        width={32}
        height={32}
      />
        </div>
    );
};

export default SearchBar;
