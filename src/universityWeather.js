import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

export function fetchUniversityWeather(university) {
  const universities = fetchUniversities(university).then((array) => {
    if (array.length) {
      return array;
    } else {
      throw new Error("No results found for query.");
    }
  });
  const locations = universities
    .then((arr) => arr.map((school) => fetchLongitudeAndLatitude(school)))
    .then((arr) => Promise.all(arr));
  const weather = locations
    .then((locs) =>
      locs.map((location) => fetchCurrentWeather(location.lon, location.lat))
    )
    .then((arr) => Promise.all(arr));
  const temps = weather
    .then((weathers) =>
      weathers.map(
        (w) =>
          w.temperature_2m.reduce((acc, e) => acc + e, 0) /
          w.temperature_2m.length
      )
    )
    .then((arr) => Promise.all(arr));
  const average = temps.then((arr) =>
    arr.length ? arr.reduce((acc, e) => acc + e, 0) / arr.length : 0
  );
  return Promise.all([temps, universities, average])
    .then((arr) =>
      arr[1].reduce((acc, e, i) => ({ ...acc, [e]: arr[0][i] }), {
        totalAverage: arr[2],
      })
    )
    .catch((err) => console.log(err));
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts")
    .then((weather) => ({ totalAverage: weather.totalAverage }))
    .catch((err) => console.log(err));
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California")
    .then((weather) => ({ totalAverage: weather.totalAverage }))
    .catch((err) => console.log(err));
}
