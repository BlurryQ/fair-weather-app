import axios from "axios";
import { Autocomplete } from "../types/Autocomplete";
import { WeatherDataProp } from "../types/WeatherDataProp";

export function getAutocompleteWeather(setData: React.Dispatch<React.SetStateAction<Autocomplete[] | null>>, query: string) {

    const api_key: string = import.meta.env.VITE_API_KEY;
    const url: string = `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${query}`;
    axios
        .get(url)
        .then((data) => {
            if (setData) setData(data.data);
        })
        .catch((err) => console.error(err));
}

export function getLatandLongWeather(latitude: number,
    longitude: number,
    setData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>,
    setLocation: React.Dispatch<React.SetStateAction<string>>) {

    const api_key: string = import.meta.env.VITE_API_KEY;
    const url: string = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude},${longitude}&days=3`;
    axios
        .get(url)
        .then((data) => {
            setData(data.data);
            const townAndRegion: string = `${data.data.location.name}, ${data.data.location.region}`;
            setLocation(townAndRegion);
        })
        .catch((err) => console.error(err));
}

