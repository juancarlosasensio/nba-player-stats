import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerSearch } from '../utils/fetchPlayerSearch';

const SearchPlayers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // WHY IS THIS NOT CACHING QUERY RESULTS??
  // https://tkdodo.eu/blog/effective-react-query-keys
  const results = useQuery({
    queryKey: ['playerSearch', searchTerm],
    queryFn: () => fetchPlayerSearch(searchTerm)
    })
    
  
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const search = formData.get("search")
    setSearchTerm(search);
  };

  return (
    <div>
      <h2>Search Players</h2>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search player" />
        <button type="submit">Search</button>
      </form>
      {results.isLoading && <div className="loading" />}
      {results.isError && <div>Error</div>}
      {results.data && (
        <ul>
          {results.data.map((playerLink, i) => (
            <li key={`${playerLink}-${i}`}>
              <a href={playerLink}>{playerLink}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPlayers;
