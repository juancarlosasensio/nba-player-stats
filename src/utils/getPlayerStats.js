export default async function getPlayerStats(link, reqOptions) {
  try {
    const playerStats = await fetch(`api/player?playerlink=${link}`, reqOptions);

    return playerStats;

  } catch (error) {
    console.error("Error getting player stats:", error);
    return [];
  }
}
