import { Autocomplete } from "../../types/Autocomplete";
import { WeatherDataProp } from "../../types/WeatherDataProp";

export async function getAutocompleteWeather(query: string): Promise<{ data: Autocomplete[] }> {
  const response = await fetch(
    `/.netlify/functions/weatherApiRequest?query=${query}`
  );

  if (!response.ok) throw new Error('Failed to fetch weather');

  const data: Autocomplete[] = await response.json();
  return { data };
}

export async function getLatandLongWeather(latitude: number, longitude: number): Promise<{ data: WeatherDataProp }> {
  const response = await fetch(
    `/.netlify/functions/weatherApiRequest?lat=${latitude}&lon=${longitude}`
  );

  if (!response.ok) throw new Error('Failed to fetch weather');

  const data: WeatherDataProp = await response.json();
  return { data };
}
