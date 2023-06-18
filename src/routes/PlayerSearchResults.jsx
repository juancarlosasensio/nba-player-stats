import { useParams } from "react-router-dom"
import usePlayerData from "../hooks/usePlayerData";

const PlayerSearchResults = () => {
  const { playerName } = useParams();
  const { data, isLoading, isError, error } = usePlayerData(playerName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Player Search Results</h2>
      {data && (
        <div>
          <h3>{data.name}</h3>
          <img src={data.image} alt={data.name} />
          <h4>Stats per Season:</h4>
          <ul>
            {data.stats.map((stat) => (
              <li key={stat.season}>
                Season: {stat.season}, Team: {stat.team}, Games Played: {stat.gamesPlayed}, Points per Game: {stat.pointsPerGame}
              </li>
            ))}
          </ul>
          <h4>Jersey Numbers Worn:</h4>
          <ul>
            {data.jerseyNumbers.map((jersey) => (
              <li key={jersey.team}>
                Team: {jersey.team}, Years: {jersey.years}, Number: {jersey.number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerSearchResults;
