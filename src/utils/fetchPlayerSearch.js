const requestOptions = {
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  };

export const fetchPlayerSearch = async (searchTerm) => {
  if (!searchTerm) {
    return []
  }
  console.log({searchTerm})
  try {
    const response = await fetch(`/api/players/${encodeURIComponent(searchTerm)}`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch player search results');
    }
    
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};