/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react'
import useDataStore from '../../../context/useDataStore';
import { message, Input, Form, Select} from 'antd';
import GetToken from '../../../components/token/GetToken';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import MapSelection from "./MapSelection";
import markerIcon from '../../../assets/incident/location.svg';
import L from 'leaflet'
import axios from 'axios';
const { Option } = Select

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function AddForm() {
  const csrfToken = GetToken()
  const { addVehicle, officesData, unitData } = useDataStore();
  const [showDeviceMarker, setShowDeviceMarker] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [locationChoice, setLocationChoice] = useState('map');

  const mapRef = useRef(null);
  const initialZoom = 5;

  const [formData, setFormData] = useState({
    vehicle_name: "",
    vehicle_code: "",
    office:"",
    unit:"",
    latitude:"",
    longitude:""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.vehicle_name.trim() === "") {
        message.error('Please enter vehicle name');
        return;
    }

    if (formData.office === "") {
        message.error('Please select an office');
        return;
    }

    if (formData.unit === "") {
        message.error('Please select a unit');
        return;
    }

    try {
        await addVehicle(formData, csrfToken);
        message.success('Vehicle added successfully');
        setFormData({
            vehicle_name: "",
            vehicle_code: "",
            office: "",
            unit: "",
        });
    } catch (error) {
        console.error("Error adding item:", error);
        message.error('Failed to add vehicle. Please try again later.');
    }
};



      const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [key, subKey] = name.split(".");
            setFormData(prevState => ({
                ...formData,
                [key]: {
                    ...prevState[key],
                    [subKey]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    

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
  }, [formData.latitude, formData.longitude]);
  

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
                
                <Form layout='vertical' >
                <Form.Item  label="Vehicle Name">
                      <Input
                          allowClear
                          type="text" 
                          value={formData.vehicle_name} // Use value prop to control input value
                          onChange={(e) => handleFormChange({ target: { name: 'vehicle_name', value: e.target.value } })} // Update form data state on change
                          placeholder='Vehicle Name'
                      />
                  </Form.Item>

                  <Form.Item label="Vehicle Code">
                      <Input
                          allowClear
                          type="text" 
                          value={formData.vehicle_code} // Use value prop to control input value
                          onChange={(e) => handleFormChange({ target: { name: 'vehicle_code', value: e.target.value } })} // Update form data state on change
                          placeholder='Vehicle Code'
                      />
                  </Form.Item>


                    <Form.Item  label="Office">
                      <Select
                          value={formData.office}
                          onChange={(value) => handleFormChange({ target: { name: 'office', value } })}
                        >
                        <Option value="">Select Office</Option>
                          {officesData.map(item => (
                            <Option key={item.id} value={item.id}>
                              {item.office_name}
                            </Option>
                          ))}
                        </Select>
                    </Form.Item>

                      <Form.Item  label="Unit">
                      <Select
                        value={formData.unit}
                        onChange={(value) => handleFormChange({ target: { name: 'unit', value } })}
                      >
                        <Option value="">Select Unit</Option>
                        {unitData.map(item => (
                          <Option key={item.id} value={item.id}>
                            {item.unit_name}
                          </Option>
                        ))}
                      </Select>
                      </Form.Item>

                   <Form.Item  label="Coordinates" >
                      <Input
                          allowClear
                          type="text" 
                          value={`${formData.latitude},${formData.longitude}`}
                          onChange={handleFormChange}
                          />
                    </Form.Item>
                     
                </Form>

               


          </div>

          <div className="officesFormWrapper2">
          <span className='officesFormBox'>
                <label>Use current location or Select on the map to add office address</label>
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
           <button className='officesFormAddBtn' onClick={handleSubmit}>Add Vehicle</button>
          </div>
       </div>
    </div>
  )
}
