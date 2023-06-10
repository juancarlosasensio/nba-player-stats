import React from 'react';
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import App from './routes/App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './routes/ErrorPage';
import PlayerDetails from './routes/PlayerDetails';

  // action={async ({ params, request }) => {
  //   let formData = await request.formData();
  //   return fakeUpdateSong(params.songId, formData);
  // }}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    action: null,
    children: [
      {
        // TODO: is there a benefit to using query params vs route params?
        // https://stackoverflow.com/a/14418100
        path: "players/:alpha/:playerLink",
        element: <PlayerDetails />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
