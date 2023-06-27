import { useLoaderData } from "react-router-dom";

const PlayerStats = () => {
  const data = useLoaderData();
  
  return (
    <>
    {!data?.stats?.length && (<div>No data</div>)}
    {data && (
      <div>
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
    )}
    </>
  )
}

export default PlayerStats;
