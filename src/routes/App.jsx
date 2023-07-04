import React from "react";
import { Link, Form, useLoaderData, Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  const [data, searchTerm] = useLoaderData();

  console.log(data)

  /* 

    Correct: 
    /api/players/steph%20curry

    Incorrect:
    GET /players/m/api/players/steph%20curry
  */

  return (
    <div className="App">
      <div>
        <header>Search for NBA Player stats</header>
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
              <div className="query">Showing results for {searchTerm}</div>
              {data.map((link, i) => {
                const formattedLink = link.split(".")[0];
                return (
                <div className="player" key={`${formattedLink}${i}`}>
                  <Link to={formattedLink}>{formattedLink}</Link>
                </div>)
              })}
            </>
          )
          }
        </main>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
