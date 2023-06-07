import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useBasketballRef } from '../hooks/useBballReference';

function PlayerDetails() {
    const { alpha, playerLink } = useParams();
    console.log(alpha, playerLink)

    const requestOptions = useRef({
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  });

  // api/player?playerlink=players/m/malonka01.html
  const { status, data: playerData, error } = useBasketballRef(`/api/player?playerlink=players/${alpha}/${playerLink}`, null, requestOptions.current);
  const { name, stats, jerseyNumbers } = playerData;

  return (    
    <>
      {status === "idle" && <div><p>Idling...</p></div>}
      {status === "error" && <div>{error}</div>}
      {status === "fetching" && <div className="loading" />}
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

/* 
  yehuuuuuuvaaaaaaa!
*/

// import React from 'react';

// const PlayerDetails = ({ playerData }) => {
//   const { name, stats, jerseyNumbers } = playerData;

//   return (
//     <div>
//       <h1>{name}</h1>

//       <section>
//         <h2>Stats per Season</h2>
//         <table>
//           <thead>
//             <tr>
//               <th scope="col">Season</th>
//               <th scope="col">Team</th>
//               <th scope="col">Games Played</th>
//               <th scope="col">Points Per Game</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stats.map((stat, index) => (
//               <tr key={index}>
//                 <td>{stat.season}</td>
//                 <td>{stat.team}</td>
//                 <td>{stat.gamesPlayed}</td>
//                 <td>{stat.pointsPerGame}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       <section>
//         <h2>Jersey Numbers Worn</h2>
//         <ul>
//           {jerseyNumbers.map((jerseyNumber, index) => (
//             <li key={index}>
//               <span>Jersey Number:</span> {jerseyNumber.jerseyNumber} - <span>Team and Years:</span> {jerseyNumber.teamAndYears}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };
