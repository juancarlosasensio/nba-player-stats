import { useFetch } from "./useFetch";

export const useBasketballRef = (apiUrl, query, options) => {
  let urlToFetch = `${apiUrl}/${query}`;
  if (query === null) {
      urlToFetch = apiUrl;
  }
  console.log('from useBballReference.js', {urlToFetch})
  return useFetch(`${urlToFetch}`, options);
}