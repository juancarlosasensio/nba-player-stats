const getPlayerData = async (playerLink) => {
  const requestOptions = {
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  };

  const res = await fetch(`/api/player?playerlink/${playerLink}`, requestOptions);
  const playerData = await res.json();
  

  return playerData;
};

export default getPlayerData;