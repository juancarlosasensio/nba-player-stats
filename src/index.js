import React from 'react';
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App, { loader as indexLoader } from './routes/App';
import PlayerStats from './routes/PlayerStats';
import ErrorPage from './routes/ErrorPage';
import getPlayerStats from './utils/getPlayerStats';

const requestOptions = {
  headers: {
    'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
    'Content-Type': 'application/json'
  }  
}

const getStatsForPlayer = async({ request }) => {
  let { pathname } = new URL(request.url);

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
    errorElement: <ErrorPage from={'Error when trying route handled by App.jsx'} />,
    loader: indexLoader,
    children: [
      {
        path: "/players/:alpha/:playerLink",
        element: <PlayerStats />,
        errorElement: <ErrorPage from={'Error when trying route handled by PlayerStats.jsx'} />,
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