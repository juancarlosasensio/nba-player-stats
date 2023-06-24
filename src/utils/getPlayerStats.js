const requestOptions = {
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  };

export const getPlayerStats = async ({ queryKey }) => {
  const playerLink = queryKey[1];

  console.log('from getPlayerData', {playerLink})

  if (!playerLink) {
    return []
  }

  try {
    const res = await fetch(`/api/player?playerlink=${playerLink}`, requestOptions);

    if (!res.ok) {
      throw new Error('Failed to fetch player search results');
    }

    const playerData = await res.json();
    return playerData;
    
  } catch (error) {
    throw new Error(error.message);
  }
};