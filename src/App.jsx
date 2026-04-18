import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastGrid from './components/ForecastGrid';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [isHindi, setIsHindi] = useState(false);
  const [error, setError] = useState('');
  
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async (city) => {
    if (!city.trim()) return setError('Please enter a city name.');
    setError('');
    const lang = isHindi ? '&lang=hi' : '';
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric${lang}`);
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeatherData(data);
      setForecastData(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const fetchForecast = async (city) => {
    if (!city.trim()) return setError('Please enter a city name.');
    setError('');
    const lang = isHindi ? '&lang=hi' : '';
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric${lang}`);
      if (!res.ok) throw new Error('Forecast not found');
      const data = await res.json();
      setForecastData(data);
      setWeatherData(null);
    } catch (err) {
      setError(err.message);
      setForecastData(null);
    }
  };

  return (
    <div id="main-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="flex-grow-1 d-flex flex-column align-items-center w-100" style={{ paddingTop: '2rem' }}>
        
        <div className="text-center glass-panel w-75 mx-auto d-flex flex-column mb-4" style={{ height: 'auto', flexGrow: 0 }}>
          <h1 className="text-white mb-3">Search by Location</h1>
          <h5 className="text-white-50 mb-4">Write the location to get the weather</h5>
          
          <SearchBar 
             isHindi={isHindi} 
             setIsHindi={setIsHindi} 
             onSearch={fetchWeather}
             onForecast={fetchForecast}
          />
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>

        {weatherData && (
          <section id="section" className="w-100 mt-4 d-flex justify-content-center flex-grow-1" style={{ display: 'flex' }}>
            <WeatherCard data={weatherData} isHindi={isHindi} />
          </section>
        )}

        {forecastData && (
          <section id="section2" className="w-100 mt-4 flex-grow-1" style={{ display: 'block' }}>
            <ForecastGrid data={forecastData} isHindi={isHindi} />
          </section>
        )}
      </div>

      <footer className="footer p-3 text-center w-100" style={{ position: 'relative', marginTop: '4rem' }}>
        <h6>Designed And Developed By : <br/>
          <a href="#">SRISTI</a>
        </h6>
      </footer>
    </div>
  );
}

export default App;
