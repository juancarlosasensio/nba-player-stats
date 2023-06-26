import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
} from '@tanstack/react-query';
import { getPlayerStats } from '../utils/getPlayerStats';

const PlayerStats = () => {
  const { lastNameStartsWith, relLink } = useParams();

  const navigate = useNavigate();

  // CHECK THIS OUT
  // https://tkdodo.eu/blog/react-query-meets-react-router

  // WHY IS THIS NOT CACHING QUERY RESULTS??
  // https://tkdodo.eu/blog/effective-react-query-keys
  const {data, isLoading, isError, error} = useQuery(['playerStats', `${lastNameStartsWith}/${relLink}`], getPlayerStats);

  if (isLoading) {
    return <div className="loading" />
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{data.name}</h1>

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
            {data.stats.map((stat, index) => (
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
          {data.jerseyNumbers.map((jerseyNumber, index) => (
            <li key={index}>
              <span>Jersey Number:</span> {jerseyNumber.jerseyNumber} - <span>Team and Years:</span> {jerseyNumber.teamAndYears}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PlayerStats;
