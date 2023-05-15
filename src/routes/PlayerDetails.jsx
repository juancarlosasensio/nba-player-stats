import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useBasketballRef } from '../hooks/useBasketballRef';

function PlayerDetails() {
    const { alpha, playerLink } = useParams();
    const requestOptions = useRef({
    headers: {
      'Authorization': `${process.env.REACT_APP_AUTH_HEADER}`, 
      'Content-Type': 'application/json'
    }  
  });

  // player?playerlink=players/m/malonka01.html
  const { status, data: playerData, error } = useBasketballRef(`api/player?playerlink=players/${alpha}/${playerLink}`, null, requestOptions.current);

  return (    
    <>
      {status === "idle" && <div><p>Idling...</p></div>}
      {status === "error" && <div>{error}</div>}
      {status === "fetching" && <div className="loading" />}
      {status === "fetched" && <div><pre>{JSON.stringify(playerData, null, 2)}</pre></div>}
    </>
  )
}

export default PlayerDetails;
