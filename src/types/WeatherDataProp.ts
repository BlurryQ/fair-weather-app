export type WeatherDataProp = {
    current: {
        condition: {
            text: string,
            icon: string,
        }
        temp_c: number,
        feelslike_c: number,
        wind_mph: number,
        gust_mph: number,
        uv: number,
        vis_miles: number,
    }
    forecast: {
        forecastday: [
            {
                astro: {
                    sunrise: string,
                    sunset: string,
                }
            },
            {
                astro: {
                    sunrise: string,
                    sunset: string,
                }
            },
            {
                astro: {
                    sunrise: string,
                    sunset: string,
                }
            }
        ]
    }
    location: {
        name: string,
        region: string,
    }
}