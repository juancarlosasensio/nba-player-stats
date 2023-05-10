import React, { useState, useRef } from "react";
import { useHN } from "./hooks/useHN";
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
  const { status, data, error } = useHN(query, requestOptions.current);

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
      <header>Search for NBA Player stats</header>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          autoComplete="off"
          name="search"
          placeholder="NBA Player Stats Search"
        />
        <button> Search </button>
      </form>
      <main>
        {status === "idle" && (
          <div> Get started by searching for your fave player by name! </div>
        )}
        {status === "error" && <div>{error}</div>}
        {status === "fetching" && <div className="loading" />}
        {status === "fetched" && (
          <>
            <div className="query"> {query ? `Showing results for ${query}` : 'Front page results'} </div>
            {data.length === 0 && <div> No players found! :( </div>}
            {data.map(player => (
              <div className="player" key={player.objectID}>
                <a target="_blank" href={player.url} rel="noopener noreferrer">
                  {player.title}
                </a>{" "}
                by {player.author}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default App;