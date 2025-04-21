import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png';
import humidity from '../assets/weather.png';
import wind from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === '') {
      alert('Enter a city name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Use OpenWeatherMap icon URL
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon, // Set the icon URL dynamically
      });
    } catch (err) {
      setWeatherData(false);
      console.error('Error fetching weather data:', err);
    }
  };

  useEffect(() => {
    search('Lagos'); // Default city
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)}/>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;