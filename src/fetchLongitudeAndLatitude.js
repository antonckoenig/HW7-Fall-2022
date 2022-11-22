import fetch from "node-fetch";

export function fetchLongitudeAndLatitude(query) {
  // Build Query URL
  const searchUrl = new URL("https://geocode-cache.herokuapp.com/search");
  searchUrl.searchParams.append("q", query);

  // GET request
  return fetch(searchUrl.toString())
    .then(res => res.json())
    .then(json => 
      Array.isArray(json) && json.length > 0
        ? Promise.resolve({lon: Number(json[0].lon), lat: Number(json[0].lat)})
        : Promise.reject(new Error("No results found for query.")))
    .catch(err => console.log(err));
}
