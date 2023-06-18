import { useQuery } from '@tanstack/react-query';
import getPlayerData from '../utils/getPlayerData';

const usePlayerData = (playerLink) => {
  return useQuery(['playerData', playerLink], getPlayerData);
};

export default usePlayerData;
