import { useFetch } from "./useFetch";

export const useBasketballRef = (apiUrl, query, options) => {
  return useFetch(`${apiUrl}/${query}`, options);
}