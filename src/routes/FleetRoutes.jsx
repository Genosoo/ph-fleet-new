import { Routes, Route } from 'react-router-dom';
import Map from '../pages/map/Map';
import Vessels from '../pages/vessels/Vessels';
import Aircrafts from '../pages/aircrafts/Aircrafts';
import Dashboard from '../pages/dashboard/Dashboard';
import Roles from '../pages/roles/Roles';
import Users from '../pages/users/Users';
import Personnel from '../pages/personnel/Personnel';
import VesselsCommercial from '../pages/commercial/vessels/VesselsCom';
import AircraftsCommercial from '../pages/commercial/aircrafts/AircraftsCom';
import Settings from '../pages/settings/Settings';
import Reports from '../pages/reports/Reports';
import Alerts from '../pages/alerts/Alerts';
import Account from '../pages/account/Account';
import AppLogout from '../auth/autoLogout/AutoLogout';
import Offices from '../pages/offices/Offices';
import Vehicles from '../pages/vehicles/Vehicles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Incidents from '../pages/incidents/Incidents';

const baseUrl = import.meta.env.VITE_URL;
const getAccount = `${baseUrl}/api/myaccount/`;

export default function FleetRoutes() {
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountResponse = await axios.get(getAccount);
        const responseData = accountResponse.data.success;
        console.log(responseData);
        setAccountData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Check if accountData.groups exists before accessing its properties
  const isAdministrator = accountData.roles && accountData.roles[0] === 'Administrator';

  return (
    <AppLogout>
      <Routes>
        {isAdministrator ? (
          // Your existing routes for authorized users
          <>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='map' element={<Map />} />

            <Route path='reports' element={<Reports />} />
            <Route path='alerts' element={<Alerts />} />
            <Route path='incidents' element={<Incidents />} />

            <Route path='roles' element={<Roles />} />
            <Route path='users' element={<Users />} />
            <Route path='personnel' element={<Personnel />} />
            <Route path='vessels' element={<Vessels />} />
            <Route path='aircrafts' element={<Aircrafts />} />
            <Route path='commercial-vessels' element={<VesselsCommercial />} />
            <Route path='commercial-aircrafts' element={<AircraftsCommercial />} />
            <Route path='settings' element={<Settings />} />
            <Route path='offices' element={<Offices />} />
            <Route path='vehicles' element={<Vehicles />} />
          </>
        ) : (
          // Your existing routes for non-authorized users
          <>
            <Route index element={<Map />} />
            <Route path='map' element={<Map />} />
          </>
        )}

        {/* Common route for both authorized and non-authorized users */}
        <Route path='account' element={<Account />} />

        {/* Fallback route for unknown paths */}
        <Route path='*' element={<h1>No Permission</h1>} />
      </Routes>
    </AppLogout>
  );
}
