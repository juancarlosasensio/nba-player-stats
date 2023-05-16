import { useFetch } from "./useFetch";

export const useBasketballRef = (apiUrl, query, options) => {
  let urlToFetch = `${apiUrl}/${query}`;
  if (query === null) {
      urlToFetch = apiUrl;
  }
  console.log(urlToFetch)
  return useFetch(`${urlToFetch}`, options);
}