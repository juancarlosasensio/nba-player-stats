import { BrowserRouter, Routes, Route} from "react-router-dom";
// import PlayerSearchResults from "./PlayerSearchResults";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SearchPlayers from "./SearchPlayers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<SearchPlayers />} />
        </Routes>
      </QueryClientProvider>  
    </BrowserRouter>
  );
};

export default App;
