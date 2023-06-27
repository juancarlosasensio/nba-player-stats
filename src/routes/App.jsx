import React from "react";
import { Link, Form, useLoaderData } from "react-router-dom";
import "./App.css";

const App = () => {
  /* 
    The call to useBballReference.js happens 3 times, which means 3 renders
    We know this because of the change in the value of 'status'
      {status: 'idle'} {query: ''} {playerLinks: Array(0)} {error: null}
      {urlToFetch: 'api/players/'}
      {status: 'fetching'} {query: ''} {playerLinks: Array(0)} {error: null}
      useBballReference.js {urlToFetch: 'api/players/'}
      {status: 'fetched'} {query: ''} {playerLinks: Array(0)} {error: null}
  */

    /* 
    Correct search endpoint:
    http://localhost:3000/api/players/karl%20malone

    Incorrect search endpoint:
    http://localhost:3000/players/m/api/players/steph%20curry
  */

  const data = useLoaderData();

  return (
    <div className="App">
      <div>
        <header>Search for NBA Player stats</header>
        {/* <Form className="Form" onSubmit={handleSubmit}> */}
        <Form className="Form" method="get" action="/">
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
          {data && (
            <>
              <div className="query">Showing results for</div>
              {data.map((link, i) => (
                <div className="player" key={`${link}${i}`}>
                  <Link to={link}>{link}</Link>
                </div>
              ))}
            </>
          )
          }
        </main>
      </div>
      {/* <div id="detail">
        <Outlet />
      </div> */}
    </div>
  );
};

export default App;
