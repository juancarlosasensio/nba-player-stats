import { useState } from 'react';
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchPlayerSearch } from '../utils/fetchPlayerSearch';

const SearchPlayers = () => {
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient()
  
  const [searchTerm, setSearchTerm] = useState('');
  const results = useQuery(['playerSearch', searchTerm], fetchPlayerSearch);
  
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
      {results.isLoading && <div>Loading...</div>}
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
