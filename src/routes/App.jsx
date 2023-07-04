import React, { useEffect } from "react";
import { Link, Form, useLoaderData, Outlet } from "react-router-dom";
import searchPlayers from '../utils/searchPlayers';
import "./App.css";

const requestOptions = {
  headers: {
    'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
    'Content-Type': 'application/json'
  }  
}

export async function loader({ request }) {
  let url = new URL(request.url);
  let searchTerm = url.searchParams.get("search");

  if (!searchTerm) { return { playerLinks: [], searchTerm: '' } }

  const res = await searchPlayers(searchTerm, requestOptions)
  const playerLinks = await res.json()

  return { playerLinks, searchTerm };
}


const App = () => {
  const { playerLinks, searchTerm } = useLoaderData();

  console.log({playerLinks})

  useEffect(() => {
    document.getElementById("search").value = searchTerm;
  }, [searchTerm]);

  return (
    <div className="App">
      <div>
        <header>Search for NBA Player stats</header>
        <Form className="Form" role="search">
          <input
            type="text"
            autoFocus
            autoComplete="off"
            name="search"
            id="search"
            placeholder="NBA Player Stats Search"
            defaultValue={searchTerm}
          />
          <button> Search </button>
        </Form>
        <main>
          {playerLinks.length ? (
            <>
              <div className="query">Showing results for {searchTerm}</div>
              {playerLinks.map((arr, i) => {
                console.log(arr)
                const formattedLink = arr[0].split(".")[0];
                return (
                <div className="player" key={`${formattedLink}${i}`}>
                  <Link to={formattedLink}>{arr[1]}</Link>
                </div>)
              })}
            </>
          ) : (
            <p>No results yet. Please search for a player.</p>
          )}
        </main>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
