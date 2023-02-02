import { LoaderArgs } from "@remix-run/node";
import { json } from "react-router";
import { useLoaderData } from "react-router";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const errorParam = url.searchParams.get("error");
  const successParam = url.searchParams.get("success");

  const data = {
    error: errorParam,
    success: successParam,
  };
  return json(data);
}

export default function Index() {
  const { error, success } = useLoaderData();

  return (
    <div>
      <h1>Acorta tu URL</h1>
      <form method="post" action="/url">
        <input
          type="text"
          name="original"
          id="original"
          placeholder="Coloca aquí la URL que deseas acortar"
        />
        <label>
          {error === "missing" && (
            <p className="error">Por favor, llena todos los campos</p>
          )}
          {error === "unavailable" && (
            <p className="error">Ese nombre ya está en uso</p>
          )}
        </label>
        <input
          type="text"
          name="short"
          id="short"
          placeholder="Coloca aquí la versión corta"
        />
        <button type="submit">Acortar</button>
      </form>
      {success && (
        <p>
          ¡Listo! Tu URL acortada es <a href={`/${success}`}>{`${success}`}</a>
        </p>
      )}
    </div>
  );
}
