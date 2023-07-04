export default async function searchPlayers(name, reqOptions) {
  try {
    console.log('from searchPlayers', { name })
    const playerLinks = await fetch(`/api/players/${name}`, reqOptions);

    return playerLinks

  } catch (error) {
    console.error("Error searching players:", error);
    return [];
  }
}
