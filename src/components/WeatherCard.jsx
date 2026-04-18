export default function WeatherCard({ data, isHindi }) {
  const d = isHindi ? {
    temp: 'तापमान', feel: 'अनुभव', pressure: 'दबाव', humidity: 'नमी',
    min: 'न्यूनतम', max: 'अधिकतम', deg: 'डिग्री', clouds: 'बादल',
    sunrise: 'सूर्योदय', sunset: 'सूर्यास्त'
  } : {
    temp: 'Temp', feel: 'Feel', pressure: 'Pressure', humidity: 'Humidity',
    min: 'Min', max: 'Max', deg: 'degrees', clouds: 'Clouds',
    sunrise: 'Sunrise', sunset: 'Sunset'
  };

  const sunriseTS = new Date((data.sys.sunrise + data.timezone) * 1000).toUTCString().slice(-11, -7) + ' AM';
  const sunsetTS = new Date((data.sys.sunset + data.timezone) * 1000).toUTCString().slice(-11, -7) + ' PM';

  return (
    <div className="card text-white w-50 m-auto glass-panel">
      <div className="card-img-overlay" style={{ position: 'relative', height: 'auto', minHeight: '100%', padding: '2rem' }}>
        <h3 className="card-title text-center text-warning mb-4">{data.name}, {data.sys.country}</h3>
        <div className="d-flex flex-row justify-content-around">
          <ul className="list-group list-unstyled mr-2" style={{ flex: 1 }}>
            <li className="list-group-item"><i className="fas fa-thermometer-half text-warning my-2"></i> {d.temp}: {data.main.temp} C</li>
            <li className="list-group-item"><i className="fas fa-meteor text-warning my-2"></i> {d.feel}: {data.main.feels_like} C</li>
            <li className="list-group-item" style={{textTransform:'capitalize'}}><i className="fas fa-cloud-sun-rain text-warning my-2"></i> {data.weather[0].description || data.weather[0].main}</li>
            <li className="list-group-item"><i className="fas fa-compress-arrows-alt text-warning my-2"></i> {d.pressure}: {data.main.pressure} hPa</li>
            <li className="list-group-item"><i className="fas fa-percent text-warning my-2"></i> {d.humidity}: {data.main.humidity}%</li>
            <li className="list-group-item"><i className="fas fa-sun text-warning my-2"></i> {d.sunrise}: {sunriseTS}</li>
          </ul>
          <ul className="list-group list-unstyled ml-2" style={{ flex: 1 }}>
            <li className="list-group-item"><i className="fas fa-thermometer-half text-warning my-2"></i> {d.min}: {data.main.temp_min} C</li>
            <li className="list-group-item"><i className="fas fa-temperature-high text-warning my-2"></i> {d.max}: {data.main.temp_max} C</li>
            <li className="list-group-item"><i className="fas fa-wind text-warning my-2"></i> {data.wind.speed} m/s</li>
            <li className="list-group-item"><i className="fas fa-compass text-warning my-2"></i> {data.wind.deg} {d.deg}</li>
            <li className="list-group-item"><i className="fas fa-cloud text-warning my-2"></i> {d.clouds}: {data.clouds.all}%</li>
            <li className="list-group-item"><i className="fas fa-sun text-warning my-2"></i> {d.sunset}: {sunsetTS}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
