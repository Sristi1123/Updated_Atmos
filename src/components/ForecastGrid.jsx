export default function ForecastGrid({ data, isHindi }) {
  const forecastFive = data.list.filter((value, index) => index % 8 === 0);
  const d = isHindi ? {
    temp: 'तापमान', feel: 'अनुभव', pressure: 'दबाव', humidity: 'नमी',
    min: 'न्यूनतम', max: 'अधिकतम', deg: 'डिग्री', clouds: 'बादल'
  } : {
    temp: 'Temp', feel: 'Feel', pressure: 'Pressure', humidity: 'Humidity',
    min: 'Min', max: 'Max', deg: 'degrees', clouds: 'Clouds'
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '0 1rem' }}>
      {forecastFive.map((day, index) => (
        <div key={index} style={{ flex: '1 1 300px', maxWidth: '400px', marginBottom: '2rem', transition: 'all 0.3s ease' }}>
          <div className="card text-white w-100 mx-2 glass-panel" style={{ height: '100%' }}>
            <div className="card-img-overlay" style={{ position: 'relative', height: 'auto', padding: '2rem' }}>
              <h5 className="card-title text-center text-warning" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                {day.dt_txt.slice(0, -9)}
              </h5>
              <div className="d-flex flex-row justify-content-around">
                <ul className="list-group list-unstyled mr-2" style={{ flex: 1 }}>
                  <li className="list-group-item"><i className="fas fa-thermometer-half text-warning my-2"></i> {d.temp}: {day.main.temp} C</li>
                  <li className="list-group-item"><i className="fas fa-meteor text-warning my-2"></i> {d.feel}: {day.main.feels_like} C</li>
                  <li className="list-group-item"><i className="fas fa-compress-arrows-alt text-warning my-2"></i> {d.pressure}: {day.main.pressure} hPa</li>
                  <li className="list-group-item"><i className="fas fa-percent text-warning my-2"></i> {d.humidity}: {day.main.humidity}%</li>
                  <li className="list-group-item" style={{textTransform:'capitalize'}}><i className="fas fa-cloud-sun-rain text-warning my-2"></i> {day.weather[0].description || day.weather[0].main}</li>
                </ul>
                <ul className="list-group list-unstyled ml-2" style={{ flex: 1 }}>
                  <li className="list-group-item"><i className="fas fa-temperature-low text-warning my-2"></i> {d.min}: {day.main.temp_min} C</li>
                  <li className="list-group-item"><i className="fas fa-temperature-high text-warning my-2"></i> {d.max}: {day.main.temp_max} C</li>
                  <li className="list-group-item"><i className="fas fa-cloud text-warning my-2"></i> {d.clouds}: {day.clouds.all}%</li>
                  <li className="list-group-item"><i className="fas fa-wind text-warning my-2"></i> {day.wind.speed} m/s</li>
                  <li className="list-group-item"><i className="fas fa-compass text-warning my-2"></i> {day.wind.deg} {d.deg}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
