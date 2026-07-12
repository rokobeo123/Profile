const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = process.env.OPENWEATHER_CITY;

export const getWeatherData = async () => {
  if (!WEATHER_API_KEY || !CITY) return null;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric`,
      { next: { revalidate: 1800 } } // Cache for 30 minutes
    );

    if (!response.ok) return null;

    const data = await response.json();
    return {
      temp: data.main.temp,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: CITY,
    };
  } catch (error) {
    console.error("Error fetching weather data", error);
    return null;
  }
};
