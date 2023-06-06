import React, { useState, useRef } from "react";
import { Outlet, Link, Form } from "react-router-dom";
import { useBasketballRef } from "../hooks/useBballReference";
import "./App.css";

const App = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
  const requestOptions = useRef({
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  });
  const [query, setQuery] = useState("");
  const { status, data: playerLinks, error } = useBasketballRef('api/players', query, requestOptions.current);

  const handleSubmit = e => {
    e.preventDefault();

    const search = e.target.search.value;
    if (search) {
      setQuery(search);
      e.target.search.value = "";
    }
  };

  return (
    <div className="App">
      <div>
        <header>Search for NBA Player stats</header>
        <Form className="Form" onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            autoComplete="off"
            name="search"
            placeholder="NBA Player Stats Search"
          />
          <button> Search </button>
        </Form>
        <main>
          {status === "idle" && (
            <div> Get started by searching for your fave player by name! </div>
          )}
          {status === "error" && <div>{error}</div>}
          {status === "fetching" && <div className="loading" />}
          {status === "fetched" && (
            <>
              <div className="query"> {query ? `Showing results for ${query}` : 'Front page results'} </div>
              {playerLinks.length === 0 && <div>{`No players found! :(`}</div>}
              {playerLinks.map((link, i) => (
                <div className="player" key={`${link}${i}`}>
                  <Link to={link}>{link}</Link>
                </div>
              ))}
            </>
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