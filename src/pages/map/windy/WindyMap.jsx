import Iframe from 'react-iframe';

const WindyMap = () => {
  return (
    <div className='relative w-full h-full'>
      <Iframe
        url="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=14.605&lon=121.003"
        className='absolute inset-0 w-full h-full'
        frameBorder="0"
      />
    </div>
  );
};

export default WindyMap;



// import L from 'leaflet'; // Import Leaflet library if not already done
// import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS if not already done

// function MapComponent() {
//         const options = {
//             // Required: API key
//             key: 'a6dLTKTFeecHJVB9W2msoEcWzgS8bbVx', // REPLACE WITH YOUR KEY !!!

//             // Put additional console output
//             verbose: true,

//             // Optional: Initial state of the map
//             lat: 50.4,
//             lon: 14.3,
//             zoom: 5,
//         };

//         // Initialize Windy API
//         window.windyInit(options, windyAPI => {
//             // windyAPI is ready, and contain 'map', 'store',
//             // 'picker' and other useful stuff
// console.log("windy",windyAPI);
//             const { map } = windyAPI;
//             // .map is an instance of Leaflet map

//             L.popup()
//                 .setLatLng([50.4, 14.3])
//                 .setContent('Hello World')
//                 .openOn(map);

//                 L.popup()
//                 .setLatLng([50.4, 14.3])
//                 .setContent('Hello Geno')
//                 .openOn(map);
//         });

//     return (
//         <div id="windy" className='w-full h-full'>
//             {/* Map container */}
//         </div>
//     );
// }

// export default MapComponent;



