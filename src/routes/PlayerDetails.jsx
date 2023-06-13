import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useBasketballRef } from '../hooks/useBballReference';

function PlayerDetails() {
    const { alpha, playerLink } = useParams();
    console.log('from PlayerDetails.jsx',{alpha}, {playerLink})

    /* 
      TODO: STILL NEED TO FIGURE THIS OUT! NEED TO FOUND A WAY TO USE 
      REACT ROUTER API'S TO DO THIS. WHY? BECAUSE I THINK IT'S THE MOST STRAIGHTFORWARD WAY
      OF MAKING A REQUEST TO THE "/" RELATIVE PATH FROM ANYWHERE, AND THUS CALLING THE 
      APPROPRIATE REACT ROUTER FORM ACTION

      THE PROBLEM WITH THE APPROACH ABOVE: CAN'T SEEM TO FIGURE OUT HOW TO KEEP PARAMS
      SENT TO REACT ROUTER IN SYNC WITH STATE AND ALSO GET THE DATA THAT I NEED
      BACK IN THE REACT COMPONENT, LIKE STATUS AND ERRORS OF THE REQUEST :ponder

      
      TODO: fix issue with request to get playerData

      When the app first loads and we search for a player like "Karl Malone" from http://localhost:3000/,
      we make a request to http://localhost:3000/api/players/karl%20malone, 
      it sends back a response with player links and we display them succesfully.

      If we search for another player, like "Steph Curry" from http://localhost:3000/,
      ***without*** clicking any of the player links, 
      we make a request to http://localhost:3000/api/players/steph%20curry,
      it sends back a response with player links and we display them succesfully.

      However, if we click on a player link, ***and then search for another player*** 
      we make a request to http://localhost:3000/api/player?playerlink=players/m/malonka01.html,
      it sends back the data for said player and display it alongside the player links from our original search.
      This also navigates us to the PlayerDetails page and the URL now looks
      like: http://localhost:3000/players/m/malonka01.html

      If we then want to search for different player, say "Steph Curry", we start that
      search/request from http://localhost:3000/players/m/malonka01.html

      and the request is sent to http://localhost:3000/players/m/api/players/steph%20curry
      This results in a "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" error,
      and I think it's because we're making a request to an endpoint for which we don't have
      a handler and therefore Express.js returns index.html given that we have the code below to manage unspecified routes:
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
      });

     How do we fix this? We need to correctly define where the request is going to on subsequent searches... 



    */

    const requestOptions = useRef({
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  });

  // api/player?playerlink=players/m/malonka01.html
  const { status, data: playerData, error } = useBasketballRef(`/api/player?playerlink=players/${alpha}/${playerLink}`, null, requestOptions.current);
  const { name, stats, jerseyNumbers } = playerData;

  /* 
    Correct search endpoint:
    http://localhost:3000/api/players/karl%20malone

    Incorrect search endpoint:
    http://localhost:3000/players/m/api/players/steph%20curry
  */

  return (    
    <>
      {status === "idle" && <div><p>Idling...</p></div>}
      {status === "error" && <div>{error}</div>}
      {status === "fetching" && <div className="loading" />}
      {/* Use code below for testing only... */}
      {/* {status === "fetched" && <div><pre>{JSON.stringify(playerData, null, 2)}</pre></div>} */}
      {status === "fetched" && 
        <div>
        <h1>{name}</h1>

        <section>
          <h2>Stats per Season</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Season</th>
                <th scope="col">Team</th>
                <th scope="col">Games Played</th>
                <th scope="col">Points Per Game</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.season}</td>
                  <td>{stat.team}</td>
                  <td>{stat.gamesPlayed}</td>
                  <td>{stat.pointsPerGame}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Jersey Numbers Worn</h2>
          <ul>
            {jerseyNumbers.map((jerseyNumber, index) => (
              <li key={index}>
                <span>Jersey Number:</span> {jerseyNumber.jerseyNumber} - <span>Team and Years:</span> {jerseyNumber.teamAndYears}
              </li>
            ))}
          </ul>
        </section>
      </div>
      }
    </>
  )
}

export default PlayerDetails;
