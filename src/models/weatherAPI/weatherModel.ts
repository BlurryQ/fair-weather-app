// import axios, { AxiosResponse } from "axios";
import { Autocomplete } from "../../types/Autocomplete";
import { WeatherDataProp } from "../../types/WeatherDataProp";


// TODO review comments


// export const getWeatherData = async (
//   lat: number,
//   lon: number
// ): Promise<{ data: WeatherDataProp }> => {
//   const response = await fetch(
//     `/.netlify/functions/weatherApiRequest?lat=${lat}&lon=${lon}`
//   );

//   if (!response.ok) throw new Error('Failed to fetch weather');

//   const data: WeatherDataProp = await response.json();
//   return { data };
// };


export async function getAutocompleteWeather(query: string): Promise<{ data: Autocomplete[] }> {
  const response = await fetch(
    `/.netlify/functions/weatherApiRequest?query=${query}`
  );

  if (!response.ok) throw new Error('Failed to fetch weather');

  const data: Autocomplete[] = await response.json();
  return { data };


    // const api_key: string = import.meta.env.WEATHER_API;
    // const url: string = `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${query}`;
    // return axios.get(url)
}

export async function getLatandLongWeather(latitude: number, longitude: number): Promise<{ data: WeatherDataProp }> {
  const response = await fetch(
    `/.netlify/functions/weatherApiRequest?lat=${latitude}&lon=${longitude}`
  );

  if (!response.ok) throw new Error('Failed to fetch weather');

  const data: WeatherDataProp = await response.json();
  return { data };


    // const api_key: string = import.meta.env.WEATHER_API;
    // const url: string = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude},${longitude}&days=3`;
    // return axios.get(url)
}