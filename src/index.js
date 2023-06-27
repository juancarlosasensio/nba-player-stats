import React from 'react';
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './routes/App';
import PlayerStats from './routes/PlayerStats';
import ErrorPage from './routes/ErrorPage';
import searchPlayers from './utils/searchPlayers';
import getPlayerStats from './utils/getPlayerStats';

const requestOptions = {
  headers: {
    'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
    'Content-Type': 'application/json'
  }  
}

const searchByName = async ({ request }) => {
  let url = new URL(request.url);
  let searchTerm = url.searchParams.get("search");

  if (!searchTerm) {
    return [[], '']
  }

  const res = await searchPlayers(searchTerm, requestOptions)
  const playerLinks = await res.json()

  return [playerLinks, searchTerm];
}

const getStatsForPlayer = async({ request }) => {
  let { pathname } = new URL(request.url);

  console.log('yo from getStatsPlayer', {pathname})

  if (!pathname || !pathname.includes('players')) {
    return [];
  }
  
  const res = await getPlayerStats(`${pathname}.htm`, requestOptions);
  const stats = await res.json();

  return stats;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: searchByName,
    children: [
      {
        path: "/players/:alpha/:playerLink",
        element: <PlayerStats />,
        errorElement: <ErrorPage />,
        loader: getStatsForPlayer
    }
    ]
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);