import axios, { AxiosResponse } from "axios";

export function getAutocompleteWeather(query: string): Promise<AxiosResponse> {
    const api_key: string = import.meta.env.VITE_WEATHER_API;
    const url: string = `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${query}`;
    return axios.get(url)
}

export function getLatandLongWeather(latitude: number, longitude: number): Promise<AxiosResponse> {
    const api_key: string = import.meta.env.VITE_WEATHER_API;
    const url: string = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude},${longitude}&days=3`;
    return axios.get(url)
}

