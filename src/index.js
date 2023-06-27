import React from 'react';
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  redirect
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

const indexSearchAction = async ({ request }) => {
  let url = new URL(request.url);
  let searchTerm = url.searchParams.get("search");

  const res = await searchPlayers(searchTerm, requestOptions)
  const playerLinks = await res.json()

  return playerLinks;
}

const getStatsForPlayer = async({ request }) => {
  let { pathname } = new URL(request.url);
  const res = await getPlayerStats(pathname, requestOptions);

  const stats = await res.json();
  return stats;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: indexSearchAction
  }, 
  {
    // TODO: is there a benefit to using query params vs route params?
    // https://stackoverflow.com/a/14418100
      path: "players/:alpha/:playerLink",
      element: <PlayerStats />,
      loader: getStatsForPlayer
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);