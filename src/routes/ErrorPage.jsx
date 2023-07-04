import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage({ from }) {
  const error = useRouteError();
  console.error(error, from);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      {from && <p>{from}</p>}
      <Link path="/">
        Go back home
      </Link>
    </div>
  );
}