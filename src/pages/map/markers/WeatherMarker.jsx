/* eslint-disable react/prop-types */
import { Marker } from 'react-leaflet';
import L from 'leaflet'

const WeatherMarker = ({ location, isCelsius }) => {
  if (location.weather && location.weather.weather && location.weather.coord) {
    const latitude = location.weather.coord.lat;
    const longitude = location.weather.coord.lon;
    const temperatureValue = isCelsius
      ? (location.weather.main.temp - 273.15).toFixed(0)
      : (((location.weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(0);
    const weatherIcon = location.weather.weather[0].icon; // Weather icon code
    const markerKey = `${location.name}-${location.id}`;

    return (
      <Marker
        key={markerKey}
        position={[latitude, longitude]}
        icon={
          new L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-content">
                      <p>${location.name}</p>
                      <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon"/>
                      <div class="temperature">${temperatureValue}&deg;C</div>
                    </div>`,
          })
        }
      />
    );
  }
  return null;
};

export default WeatherMarker;
