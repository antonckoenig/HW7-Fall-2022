import fetch from "node-fetch";

export function fetchCurrentWeather(longitude, latitude) {
  // Build Query URL
  const searchUrl = new URL("https://api.open-meteo.com/v1/forecast");
  searchUrl.searchParams.append("longitude", longitude);
  searchUrl.searchParams.append("latitude", latitude);
  searchUrl.searchParams.append("hourly", "temperature_2m");
  searchUrl.searchParams.append("temperature_unit", "fahrenheit");

  // GET request
  return fetch(searchUrl.toString())
    .then((res) => res.json())
    .then((json) =>
      typeof json === "object"
        ? Promise.resolve({
            time: json.hourly.time,
            temperature_2m: json.hourly.temperature_2m,
          })
        : Promise.reject(new Error("No results found."))
    );
}
