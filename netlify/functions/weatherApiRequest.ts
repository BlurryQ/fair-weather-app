import axios from 'axios';
import { Handler } from '@netlify/functions';

type WeatherEventQuery = {
  lat?: string;
  lon?: string;
  query?: string;
}

const weatherApiRequest: Handler = async (event) => {
  const apiKey = process.env.WEATHER_API;
  if (!apiKey) return { statusCode: 500, body: 'API key not set' };
  const { lat, lon, query }: WeatherEventQuery = event.queryStringParameters || {};

  try {
    let url = '';
    if (query) {
      url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;
    } else if (lat && lon) {
      url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`;
    } else {
      return { statusCode: 400, body: 'Missing query or coordinates' };
    }

    const response = await axios.get(url);
    return { statusCode: 200, body: JSON.stringify(response.data) };
  } catch (err: any) {
    return { statusCode: 500, body: err.message };
  }
};

export { weatherApiRequest as handler };
