/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react'
import useDataStore from '../../../context/useDataStore';
import { message, Input } from 'antd';
import GetToken from '../../../components/token/GetToken';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import MapSelection from "./MapSelection";
import markerIcon from '../../../assets/incident/location.svg';
import L from 'leaflet'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function UpdateForm() {
  const csrfToken = GetToken()
  const { updateOffice} = useDataStore();
  const [showDeviceMarker, setShowDeviceMarker] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [locationChoice, setLocationChoice] = useState('map');
  const location = useLocation();
  console.log({location});
  const item = location.state.office;


  const mapRef = useRef(null);
  const initialZoom = 5;

  const [formData, setFormData] = useState({
     office_name: item?.office_name || "",
     office_address: item?.office_address || "",
     office_code: item?.office_code || "",
     camp_base: item?.camp_base || "",
     latitude: item?.latitude || "",
     longitude:item?.longitude || ""
  })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.office_name.trim() === "" ) {
            message.error('Please enter office name');
            return;
        }
    
        if (formData.office_address.trim() === "" ) {
            message.error('Please enter office address');
            return;
        }
    
        try {
        const officeId = location.state.office.id
          await updateOffice(officeId, formData, csrfToken);

        } catch (error) {
          console.error("Error adding item:", error);
        }
      };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }


  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData({
              ...formData,
                latitude: latitude,
                longitude: longitude,
            });
            
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    fetchUserLocation();
  }, []);

useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${formData.latitude}&lon=${formData.longitude}&format=json`);
        const { display_name } = response.data;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          office_address: display_name,
        }));

        console.log('Address response:', response);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };
  
    if (formData.latitude && formData.longitude) {
      fetchAddress();
    }
  }, []);
  

const handleLocationChoiceChange = (event) => {
    if (event.target.value === 'map') {
      // Reset the map's zoom level
      if (mapRef.current) {
        mapRef.current.setView([12.8797, 121.774], initialZoom);
      }
    }
    // Handle other location choices if needed
    setLocationChoice(event.target.value);
  
  };

  const handleDeviceLocation = () => {
    console.log('Attempting to get device location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log('Device location retrieved successfully:', position.coords);
          const { latitude, longitude } = position.coords;
          setDeviceLocation({ latitude, longitude });
  
          // Update the map's center and zoom level
          mapRef.current.setView([latitude, longitude], 14,  { animate: true }); // 14 is an example zoom level
  
          setShowDeviceMarker(true); // Show the device marker again
          try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const { display_name } = response.data;
            setFormData((prevFormData) => ({
              ...prevFormData,
              office_address: display_name
            }));
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };


  const handleMapChange = async (location) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`);
      const { display_name } = response.data;
      setFormData({
        ...formData,
        latitude: location.lat,
        longitude: location.lng,
        office_address: display_name
      });

        // Zoom the map to the selected location
mapRef.current.setView([location.lat, location.lng], 14, { animate: true });

      console.log('address map', response)
      // Hide the device marker when the user selects a location on the map
      setShowDeviceMarker(false);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };  

  return (
    <div className='officesFormContainer'>
       <div className="officesFormFlex">
        <div className='officesFormWrapper'>
              <span className='officesFormBox'>
                <label>Offices Name</label>
                <Input
                  allowClear
                  type="text" 
                  name="office_name"
                  value={formData.office_name}
                  onChange={handleFormChange}
                  placeholder='Office Name'
                  />
              </span>
                
                <span className='officesFormBox'>
                  <label>Office Code</label>
                  <Input
                    allowClear
                    type="text" 
                    name="office_code"
                    value={formData.office_code}
                    onChange={handleFormChange}
                    placeholder='Office Code'
                    />
                </span>

                <span className='officesFormBox'>
                  <label>Camp Base</label>
                  <Input
                    allowClear
                    type="text" 
                    name="camp_base"
                    value={formData.camp_base}
                    onChange={handleFormChange}
                    placeholder='Camp Base'
                    />
                  </span>

                  <span className='officesFormBox'>
                  <label>Coordinates</label>
                  <Input
                    type="text" 
                    value={`${formData.latitude}, ${formData.longitude}`}
                    onChange={handleFormChange}
                    placeholder='Camp Base'
                    />
                  </span>

          </div>

          <div className="officesFormWrapper2">
          <span className='officesFormBox'>
                 <label>Use current location or Select on the map to update office address</label>
                 <Input
                  type="text" 
                  name="office_address"
                  value={formData.office_address}
                  onChange={handleFormChange}
                  placeholder='Office Address'
                  disabled
                  />
              </span>


           <div className="officesFormCheckbox">
              <span  className='officesFormBox2'>
                <input 
                  type="checkbox" 
                  value="device"
                  checked={locationChoice === 'device'}
                  onChange={handleLocationChoiceChange}
                  onClick={handleDeviceLocation}
                  defaultChecked
                  />
                <label>Use Current Location</label>
              </span>

              <span  className='officesFormBox2'>
                 <input 
                  type="checkbox" 
                  value="map"
                  checked={locationChoice === 'map'}
                  onChange={handleLocationChoiceChange}
                />
                 <label>Select on map</label>
              </span>

              
           </div>
            <div className="officesFormMap">
              <MapContainer  ref={mapRef}  center={[12.8797, 121.774]}  zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                  {locationChoice !== 'device' && <MapSelection onChange={handleMapChange} />}
                  {locationChoice === 'device' && showDeviceMarker && deviceLocation && (
                  <Marker position={[deviceLocation.latitude, deviceLocation.longitude]} icon={customIcon} />
                  )}
              </MapContainer>
          </div>
           <button className='officesFormAddBtn' onClick={handleSubmit}>Update Office</button>
          </div>
       </div>
    </div>
  )
}
