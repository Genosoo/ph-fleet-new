import { Marker, Polyline, useMapEvent, Tooltip } from 'react-leaflet';
import MarineTrafficIconMeasure from './icon/MarineTrafficIcon';
import { useState } from 'react';
import L from 'leaflet';

export default function Measurement() {
  const [measurementMode, setMeasurementMode] = useState(false);
  const [measurementCoordinates, setMeasurementCoordinates] = useState([]);
  const [startPosition, setStartPosition] = useState(null);

  const toggleMeasurementMode = () => {
    setMeasurementMode(!measurementMode);
    if (!measurementMode) {
      // If starting a new measurement, clear previous coordinates
      setMeasurementCoordinates([]);
    }
  };

  const EARTH_RADIUS_NM = 3443.92; // Earth's radius in nautical miles
  const calculateMeasurementDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const latlng1 = L.latLng(coordinates[i]);
      const latlng2 = L.latLng(coordinates[i + 1]);
      const distance = latlng1.distanceTo(latlng2) / EARTH_RADIUS_NM; // Convert meters to nautical miles
      totalDistance += distance;
    }
    return totalDistance;
  };

  useMapEvent('click', (e) => {
    if (measurementMode) {
      if (!startPosition) {
        // Set the start position when the user starts measurement
        setStartPosition(e.latlng);
        setMeasurementCoordinates([e.latlng]);
      } else {
        setMeasurementCoordinates(prevCoordinates => [...prevCoordinates, e.latlng]);
      }
    }
  });

  const measurementDistance = calculateMeasurementDistance(measurementCoordinates);

  return (
    <div>
      {measurementMode && (
        <p className='mtDistance'><b className='text-gray-500'>Distance:</b> {(measurementDistance).toFixed(2)} NM</p>
      )}

      <button className={`${measurementMode ? 'bg-[#EB5454]' : 'bg-[#0DB0E6]'} absolute z-[1000]`} onClick={toggleMeasurementMode}>
        {measurementMode ? 'Stop Measurement' : 'Start Measurement'}
      </button>

      {measurementCoordinates.length > 1 && (
        <Polyline positions={measurementCoordinates} color="#FFC100" />
      )}

      {measurementCoordinates.map((coordinate, idx) => (
        <Marker key={`measurement-dot-${idx}`} position={coordinate} icon={MarineTrafficIconMeasure}>
          <Tooltip>{`Distance: ${(calculateMeasurementDistance(measurementCoordinates.slice(0, idx + 1))).toFixed(2)} NM`}</Tooltip>
        </Marker>
      ))}
    </div>
  );
}
