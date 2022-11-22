// Coded by Anton Koenig

import fetch from "node-fetch";

export function fetchUniversities(query) {
  // Build Query URL
  const searchUrl = new URL("https://university-web-api.herokuapp.com/search");
  searchUrl.searchParams.append("name", query);

  // GET request
  return fetch(searchUrl.toString())
    .then((res) => res.json())
    .then((json) =>
      Array.isArray(json)
        ? Promise.resolve(json.map((obj) => obj.name))
        : Promise.reject(new Error("Bad json."))
    );
}
